import { invitationGroups } from './_rsvp-guests.js'

const json = (body, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'private, no-store, max-age=0',
    },
  })

export async function POST(request) {
  try {
    const body = await request.json()

    const code = String(body?.code || '')
      .trim()
      .toUpperCase()

    if (!code || code.length !== 5) {
      return json(
        {
          success: false,
          error: 'INVALID_CODE',
        },
        400
      )
    }

    const group = invitationGroups[code]

    if (!group) {
      return json(
        {
          success: false,
          error: 'INVALID_CODE',
        },
        404
      )
    }

    return json({
      success: true,

      guests: group.guests.map((guest) => ({
        id: guest.id,
        name: guest.name,
      })),
    })
  } catch (error) {
    console.error('RSVP lookup error:', error)

    return json(
      {
        success: false,
        error: 'SERVER_ERROR',
      },
      500
    )
  }
}