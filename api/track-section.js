import { invitationRefs } from './_invitation-refs.js'

const json = (body, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'private, no-store, max-age=0',
    },
  })

const getSupabaseConfig = () => ({
  url:
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL,

  key:
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY,
})

const allowedSections = new Set([
  'inicio',
  'boda',
  'informacion',
  'hospedaje',
  'transporte',
  'medellin',
  'galeria',
  'regalos',
  'rsvp',
])

export async function POST(request) {
  try {
    const body = await request.json()

    const ref = String(body?.ref || '')
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 6)

    const section = String(
      body?.section || ''
    )
      .trim()
      .toLowerCase()

    /*
      Respuesta genérica para refs o secciones inválidos.
      Así no exponemos qué refs existen.
    */
    if (
      ref.length !== 6 ||
      !invitationRefs[ref] ||
      !allowedSections.has(section)
    ) {
      return json({
        success: true,
      })
    }

    const { url, key } =
      getSupabaseConfig()

    if (!url || !key) {
      console.error(
        'Missing Supabase server configuration.'
      )

      return json(
        {
          success: false,
          error: 'SERVER_CONFIGURATION',
        },
        500
      )
    }

    const now =
      new Date().toISOString()

    const queryUrl =
      `${url}/rest/v1/invitation_page_views` +
      `?ref_code=eq.${encodeURIComponent(ref)}` +
      `&section_name=eq.${encodeURIComponent(section)}` +
      `&select=id,visit_count,first_visited_at`

    const lookupResponse =
      await fetch(queryUrl, {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
      })

    if (!lookupResponse.ok) {
      const details =
        await lookupResponse.text()

      console.error(
        'Supabase section lookup failed:',
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

    const existingRows =
      await lookupResponse.json()

    const existing =
      existingRows?.[0]

    if (!existing) {
      const insertResponse =
        await fetch(
          `${url}/rest/v1/invitation_page_views`,
          {
            method: 'POST',
            headers: {
              apikey: key,
              Authorization: `Bearer ${key}`,
              'Content-Type':
                'application/json',
              Prefer:
                'return=minimal',
            },
            body: JSON.stringify({
              ref_code: ref,
              section_name: section,
              first_visited_at: now,
              last_visited_at: now,
              visit_count: 1,
            }),
          }
        )

      if (!insertResponse.ok) {
        const details =
          await insertResponse.text()

        console.error(
          'Supabase section insert failed:',
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

    const updateResponse =
      await fetch(
        `${url}/rest/v1/invitation_page_views` +
          `?ref_code=eq.${encodeURIComponent(ref)}` +
          `&section_name=eq.${encodeURIComponent(section)}`,
        {
          method: 'PATCH',
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
            'Content-Type':
              'application/json',
            Prefer:
              'return=minimal',
          },
          body: JSON.stringify({
            first_visited_at:
              existing.first_visited_at ||
              now,
            last_visited_at: now,
            visit_count:
              nextVisitCount,
          }),
        }
      )

    if (!updateResponse.ok) {
      const details =
        await updateResponse.text()

      console.error(
        'Supabase section update failed:',
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
    console.error(
      'Section tracking error:',
      error
    )

    return json(
      {
        success: false,
        error: 'SERVER_ERROR',
      },
      500
    )
  }
}
