import { invitationRefs } from './_invitation-refs.js'

const json = (body, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'private, no-store, max-age=0',
    },
  })

const getSupabaseConfig = () => {
  const url =
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL

  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY

  return { url, key }
}

const supabaseHeaders = (key, extra = {}) => ({
  apikey: key,
  Authorization: `Bearer ${key}`,
  'Content-Type': 'application/json',
  ...extra,
})

export async function POST(request) {
  try {
    const body = await request.json()

    const ref = String(body?.ref || '')
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')

    if (
      ref.length !== 6 ||
      !invitationRefs[ref]
    ) {
      /*
        Deliberadamente devolvemos una respuesta genérica.
        No exponemos qué refs existen.
      */
      return json({
        success: true,
      })
    }

    const { url, key } = getSupabaseConfig()

    if (!url || !key) {
      console.error(
        'Missing SUPABASE_URL or server-side Supabase secret key.'
      )

      return json(
        {
          success: false,
          error: 'SERVER_CONFIGURATION',
        },
        500
      )
    }

    const invitation = invitationRefs[ref]
    const now = new Date().toISOString()

    /*
      Buscamos si el ref ya tiene una fila.
      Esto ocurre únicamente desde la Function server-side.
    */
    const lookupResponse = await fetch(
      `${url}/rest/v1/invitation_visits` +
        `?ref_code=eq.${encodeURIComponent(ref)}` +
        `&select=id,visit_count,first_visit`,
      {
        headers: supabaseHeaders(key),
      }
    )

    if (!lookupResponse.ok) {
      const details = await lookupResponse.text()

      console.error(
        'Supabase invitation visit lookup failed:',
        details
      )

      return json(
        {
          success: false,
          error: 'DATABASE_LOOKUP',
        },
        500
      )
    }

    const existingRows = await lookupResponse.json()
    const existing = existingRows?.[0]

    if (!existing) {
      const createResponse = await fetch(
        `${url}/rest/v1/invitation_visits`,
        {
          method: 'POST',
          headers: supabaseHeaders(key, {
            Prefer: 'return=minimal',
          }),
          body: JSON.stringify({
            ref_code: ref,
            group_name: invitation.groupName,
            first_visit: now,
            last_visit: now,
            visit_count: 1,
          }),
        }
      )

      if (!createResponse.ok) {
        const details = await createResponse.text()

        console.error(
          'Supabase invitation visit insert failed:',
          details
        )

        return json(
          {
            success: false,
            error: 'DATABASE_INSERT',
          },
          500
        )
      }

      return json({
        success: true,
      })
    }

    const nextVisitCount =
      Number(existing.visit_count || 0) + 1

    const updateResponse = await fetch(
      `${url}/rest/v1/invitation_visits` +
        `?ref_code=eq.${encodeURIComponent(ref)}`,
      {
        method: 'PATCH',
        headers: supabaseHeaders(key, {
          Prefer: 'return=minimal',
        }),
        body: JSON.stringify({
          group_name: invitation.groupName,
          first_visit:
            existing.first_visit || now,
          last_visit: now,
          visit_count: nextVisitCount,
        }),
      }
    )

    if (!updateResponse.ok) {
      const details = await updateResponse.text()

      console.error(
        'Supabase invitation visit update failed:',
        details
      )

      return json(
        {
          success: false,
          error: 'DATABASE_UPDATE',
        },
        500
      )
    }

    return json({
      success: true,
    })
  } catch (error) {
    console.error('Invitation visit tracking error:', error)

    return json(
      {
        success: false,
        error: 'SERVER_ERROR',
      },
      500
    )
  }
}
