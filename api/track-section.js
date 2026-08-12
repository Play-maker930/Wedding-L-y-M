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

const normalizeVisitorId = (value) => {
  const visitorId = String(value || '')
    .trim()
    .toUpperCase()

  return /^ANON_[A-Z0-9]{12}$/.test(visitorId)
    ? visitorId
    : ''
}

export async function POST(request) {
  try {
    const body = await request.json()

    const ref = String(body?.ref || '')
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 6)

    const anonymousId =
      normalizeVisitorId(body?.visitorId)

    const knownInvitation =
      ref.length === 6 && invitationRefs[ref]

    const trackingId =
      knownInvitation ? ref : anonymousId

    const section = String(body?.section || '')
      .trim()
      .toLowerCase()

    if (
      !trackingId ||
      !allowedSections.has(section)
    ) {
      return json({ success: true })
    }

    const { url, key } = getSupabaseConfig()

    if (!url || !key) {
      return json(
        { success: false, error: 'SERVER_CONFIGURATION' },
        500
      )
    }

    const headers = {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    }

    const now = new Date().toISOString()
    const queryUrl =
      `${url}/rest/v1/invitation_page_views` +
      `?ref_code=eq.${encodeURIComponent(trackingId)}` +
      `&section_name=eq.${encodeURIComponent(section)}` +
      `&select=id,visit_count,first_visited_at`

    const lookup = await fetch(queryUrl, { headers })

    if (!lookup.ok) {
      console.error(
        'Supabase section lookup failed:',
        await lookup.text()
      )
      return json({ success: false, error: 'DATABASE_LOOKUP' }, 500)
    }

    const rows = await lookup.json()
    const existing = rows?.[0]

    if (!existing) {
      const insert = await fetch(
        `${url}/rest/v1/invitation_page_views`,
        {
          method: 'POST',
          headers: {
            ...headers,
            Prefer: 'return=minimal',
          },
          body: JSON.stringify({
            ref_code: trackingId,
            section_name: section,
            first_visited_at: now,
            last_visited_at: now,
            visit_count: 1,
          }),
        }
      )

      if (!insert.ok) {
        console.error(
          'Supabase section insert failed:',
          await insert.text()
        )
        return json({ success: false, error: 'DATABASE_INSERT' }, 500)
      }

      return json({ success: true })
    }

    const update = await fetch(
      `${url}/rest/v1/invitation_page_views` +
        `?ref_code=eq.${encodeURIComponent(trackingId)}` +
        `&section_name=eq.${encodeURIComponent(section)}`,
      {
        method: 'PATCH',
        headers: {
          ...headers,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          first_visited_at:
            existing.first_visited_at || now,
          last_visited_at: now,
          visit_count:
            Number(existing.visit_count || 0) + 1,
        }),
      }
    )

    if (!update.ok) {
      console.error(
        'Supabase section update failed:',
        await update.text()
      )
      return json({ success: false, error: 'DATABASE_UPDATE' }, 500)
    }

    return json({ success: true })
  } catch (error) {
    console.error('Section tracking error:', error)
    return json({ success: false, error: 'SERVER_ERROR' }, 500)
  }
}
