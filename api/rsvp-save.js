import { createClient } from '@supabase/supabase-js'
import { invitationGroups } from './_rsvp-guests.js'

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
      'Cache-Control': 'no-store',
    },
  })

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405)
    }

    try {
      const body = await request.json()
      const invitationCode = String(
        body?.invitationCode || ''
      )
        .trim()
        .toUpperCase()

      const responses = Array.isArray(body?.responses)
        ? body.responses
        : []

      const message =
        typeof body?.message === 'string'
          ? body.message.trim().slice(0, 2000)
          : ''

      const group = invitationGroups[invitationCode]

      if (!group) {
        return json(
          { error: 'Invalid invitation code' },
          400
        )
      }

      if (responses.length !== group.guests.length) {
        return json(
          { error: 'Incomplete RSVP response set' },
          400
        )
      }

      const expectedGuests = new Map(
        group.guests.map((guest) => [
          guest.id,
          guest,
        ])
      )

      const seen = new Set()

      const rows = responses.map((response) => {
        const guestId = String(
          response?.guestId || ''
        ).trim()

        const attendance = response?.attendance

        const expectedGuest =
          expectedGuests.get(guestId)

        if (
          !expectedGuest ||
          seen.has(guestId) ||
          !['yes', 'no'].includes(attendance)
        ) {
          throw new Error(
            'Invalid guest response payload'
          )
        }

        seen.add(guestId)

        return {
          invitation_code: invitationCode,
          guest_id: expectedGuest.id,
          guest_name: expectedGuest.name,
          attendance,
          message: message || null,
          updated_at: new Date().toISOString(),
        }
      })

      const supabase = getSupabase()

      const { error } = await supabase
        .from('rsvp_responses')
        .upsert(rows, {
          onConflict: 'invitation_code,guest_id',
          ignoreDuplicates: false,
        })

      if (error) {
        console.error(
          'Supabase RSVP save error:',
          error
        )

        return json(
          { error: 'Could not save RSVP' },
          500
        )
      }

      return json({
        success: true,
        saved: rows.length,
      })
    } catch (error) {
      console.error('RSVP save error:', error)

      return json(
        { error: 'Invalid request' },
        400
      )
    }
  },
}
