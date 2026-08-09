import { timingSafeEqual } from 'node:crypto'
import { createClient } from '@supabase/supabase-js'
import { allGuests } from './_rsvp-guests.js'

const getSupabase = () => {
  const url = process.env.SUPABASE_URL
  const secret = process.env.SUPABASE_SECRET_KEY

  if (!url || !secret) {
    throw new Error('Supabase environment variables are missing.')
  }

  return createClient(url, secret, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })
}

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control':
        'private, no-store, max-age=0',
    },
  })

const codesMatch = (provided, expected) => {
  const a = Buffer.from(String(provided || ''))
  const b = Buffer.from(String(expected || ''))

  if (
    a.length === 0 ||
    b.length === 0 ||
    a.length !== b.length
  ) {
    return false
  }

  return timingSafeEqual(a, b)
}

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405)
    }

    try {
      const { adminCode } = await request.json()
      const expectedAdminCode =
        process.env.RSVP_ADMIN_CODE

      if (
        !expectedAdminCode ||
        !codesMatch(adminCode, expectedAdminCode)
      ) {
        return json(
          { error: 'Unauthorized' },
          401
        )
      }

      const supabase = getSupabase()

      const { data, error } = await supabase
        .from('rsvp_responses')
        .select(
          [
            'invitation_code',
            'guest_id',
            'guest_name',
            'attendance',
            'message',
            'submitted_at',
            'updated_at',
          ].join(',')
        )
        .order('updated_at', {
          ascending: false,
        })

      if (error) {
        console.error(
          'Supabase RSVP summary error:',
          error
        )

        return json(
          { error: 'Could not retrieve RSVP responses' },
          500
        )
      }

      const latestByGuest = new Map(
        (data || []).map((response) => [
          response.guest_id,
          response,
        ])
      )

      const attending = []
      const notAttending = []
      const pending = []

      allGuests.forEach((guest) => {
        const response =
          latestByGuest.get(guest.id)

        const baseGuest = {
          guestId: guest.id,
          guestName: guest.name,
          invitationCode:
            guest.invitationCode,
        }

        if (!response) {
          pending.push(baseGuest)
          return
        }

        const answeredGuest = {
          ...baseGuest,
          message: response.message || '',
          submittedAt:
            response.updated_at ||
            response.submitted_at,
        }

        if (response.attendance === 'yes') {
          attending.push(answeredGuest)
        } else {
          notAttending.push(answeredGuest)
        }
      })

      const total = allGuests.length
      const responded =
        attending.length + notAttending.length

      return json({
        success: true,
        summary: {
          total,
          responded,
          attending: attending.length,
          notAttending: notAttending.length,
          pending: pending.length,
          responseRate:
            total > 0
              ? Math.round(
                  (responded / total) * 100
                )
              : 0,
        },
        attending,
        notAttending,
        pending,
        generatedAt:
          new Date().toISOString(),
      })
    } catch (error) {
      console.error(
        'RSVP summary error:',
        error
      )

      return json(
        { error: 'Internal server error' },
        500
      )
    }
  },
}
