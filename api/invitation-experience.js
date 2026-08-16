import { invitationRefs } from './_invitation-refs.js'

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

    const ref = String(body?.ref || '')
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 6)

    // No ref or unknown ref = LITE.
    if (ref.length !== 6) {
      return json({
        success: true,
        validRef: false,
        experience: 'lite',
      })
    }

    const invitation =
      invitationRefs[ref]

    if (!invitation) {
      return json({
        success: true,
        validRef: false,
        experience: 'lite',
      })
    }

    return json({
      success: true,
      validRef: true,
      experience:
        invitation.experience === 'lite'
          ? 'lite'
          : 'full',
    })
  } catch (error) {
    console.error(
      'Invitation experience lookup error:',
      error
    )

    // Fail closed: public/default stays LITE.
    return json({
      success: true,
      validRef: false,
      experience: 'lite',
    })
  }
}
