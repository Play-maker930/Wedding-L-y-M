import { createClient } from '@supabase/supabase-js'
import { allGuests } from './_rsvp-guests.js'

const json = (body, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'private, no-store, max-age=0',
    },
  })

const getSupabase = () => {
  const url = process.env.SUPABASE_URL
  const secret = process.env.SUPABASE_SECRET_KEY

  if (!url || !secret) {
    return null
  }

  return createClient(url, secret, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })
}

export async function POST(request) {
  try {
    const body = await request.json()
    const providedCode = String(
      body?.adminCode || ''
    )
      .trim()
      .toUpperCase()

    const expectedCode = String(
      process.env.RSVP_ADMIN_CODE || ''
    )
      .trim()
      .toUpperCase()

    if (!expectedCode) {
      console.error(
        'RSVP_ADMIN_CODE is missing in Vercel.'
      )

      return json(
        {
          error:
            'RSVP_ADMIN_CODE no está configurado en Vercel.',
        },
        503
      )
    }

    if (providedCode !== expectedCode) {
      return json(
        {
          error: 'Unauthorized',
        },
        401
      )
    }

    const supabase = getSupabase()

    if (!supabase) {
      console.error(
        'SUPABASE_URL or SUPABASE_SECRET_KEY is missing.'
      )

      return json(
        {
          error:
            'Faltan las variables de Supabase en Vercel.',
        },
        503
      )
    }

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
        {
          error:
            `Supabase: ${error.message}`,
        },
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
      } else if (response.attendance === 'no') {
        notAttending.push(answeredGuest)
      } else {
        pending.push(baseGuest)
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
      'RSVP summary function error:',
      error
    )

    return json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Internal server error',
      },
      500
    )
  }
}
