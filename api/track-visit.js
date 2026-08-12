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

const normalizeRef = (value) =>
  String(value || '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 6)

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
    const ref = normalizeRef(body?.ref)
    const anonymousId = normalizeVisitorId(body?.visitorId)

    const knownInvitation = ref && invitationRefs[ref]
    const trackingId = knownInvitation ? ref : anonymousId

    if (!trackingId) {
      return json({ success: true })
    }

    const groupName = knownInvitation
      ? invitationRefs[ref].groupName
      : 'Sin ref'

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
    const lookupUrl =
      `${url}/rest/v1/invitation_visits` +
      `?ref_code=eq.${encodeURIComponent(trackingId)}` +
      `&select=ref_code,visit_count,first_visit`

    const lookup = await fetch(lookupUrl, { headers })

    if (!lookup.ok) {
      console.error(
        'Supabase invitation visit lookup failed:',
        await lookup.text()
      )
      return json({ success: false, error: 'DATABASE_LOOKUP' }, 500)
    }

    const rows = await lookup.json()
    const existing = rows?.[0]

    if (!existing) {
      const insert = await fetch(
        `${url}/rest/v1/invitation_visits`,
        {
          method: 'POST',
          headers: {
            ...headers,
            Prefer: 'return=minimal',
          },
          body: JSON.stringify({
            ref_code: trackingId,
            group_name: groupName,
            first_visit: now,
            last_visit: now,
            visit_count: 1,
          }),
        }
      )

      if (!insert.ok) {
        console.error(
          'Supabase invitation visit insert failed:',
          await insert.text()
        )
        return json({ success: false, error: 'DATABASE_INSERT' }, 500)
      }

      return json({ success: true })
    }

    const update = await fetch(
      `${url}/rest/v1/invitation_visits` +
        `?ref_code=eq.${encodeURIComponent(trackingId)}`,
      {
        method: 'PATCH',
        headers: {
          ...headers,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          last_visit: now,
          visit_count: Number(existing.visit_count || 0) + 1,
        }),
      }
    )

    if (!update.ok) {
      console.error(
        'Supabase invitation visit update failed:',
        await update.text()
      )
      return json({ success: false, error: 'DATABASE_UPDATE' }, 500)
    }

    return json({ success: true })
  } catch (error) {
    console.error('Invitation tracking error:', error)
    return json({ success: false, error: 'SERVER_ERROR' }, 500)
  }
}
