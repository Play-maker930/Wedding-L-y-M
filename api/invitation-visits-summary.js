import { invitationRefs } from './_invitation-refs.js'

const json = (body, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'private, no-store, max-age=0',
    },
  })

const getAdminCode = () =>
  process.env.RSVP_ADMIN_CODE ||
  process.env.RSVP_DASHBOARD_CODE ||
  process.env.ADMIN_CODE ||
  process.env.VITE_RSVP_ADMIN_CODE ||
  ''

const getSupabaseConfig = () => ({
  url:
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL,
  key:
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY,
})

export async function POST(request) {
  try {
    const body = await request.json()

    const adminCode = String(
      body?.adminCode || ''
    )
      .trim()
      .toUpperCase()

    const expectedAdminCode = String(
      getAdminCode()
    )
      .trim()
      .toUpperCase()

    if (
      !expectedAdminCode ||
      adminCode !== expectedAdminCode
    ) {
      return json(
        {
          success: false,
          error: 'UNAUTHORIZED',
        },
        401
      )
    }

    const { url, key } = getSupabaseConfig()

    if (!url || !key) {
      return json(
        {
          success: false,
          error: 'SERVER_CONFIGURATION',
        },
        500
      )
    }

    const response = await fetch(
      `${url}/rest/v1/invitation_visits` +
        `?select=ref_code,group_name,first_visit,last_visit,visit_count`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      const details = await response.text()

      console.error(
        'Supabase invitation visits summary failed:',
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

    const rows = await response.json()

    const visitsByRef = new Map(
      rows.map((row) => [
        row.ref_code,
        row,
      ])
    )

    const allInvitations =
      Object.entries(invitationRefs).map(
        ([refCode, invitation]) => {
          const visit =
            visitsByRef.get(refCode)

          return {
            refCode,
            groupName:
              invitation.groupName,
            rsvpCode:
              invitation.rsvpCode,
            label:
              invitation.label,
            opened:
              Boolean(visit),
            firstVisit:
              visit?.first_visit || null,
            lastVisit:
              visit?.last_visit || null,
            visitCount:
              Number(
                visit?.visit_count || 0
              ),
          }
        }
      )

    const opened = allInvitations
      .filter((item) => item.opened)
      .sort(
        (a, b) =>
          new Date(b.lastVisit) -
          new Date(a.lastVisit)
      )

    const unopened = allInvitations
      .filter((item) => !item.opened)
      .sort((a, b) =>
        a.groupName.localeCompare(
          b.groupName,
          'es',
          {
            numeric: true,
          }
        )
      )

    const totalGroups =
      allInvitations.length

    const openedGroups =
      opened.length

    const unopenedGroups =
      unopened.length

    const totalVisits =
      opened.reduce(
        (sum, item) =>
          sum + item.visitCount,
        0
      )

    const openRate =
      totalGroups > 0
        ? Math.round(
            (openedGroups / totalGroups) *
              100
          )
        : 0

    return json({
      success: true,

      summary: {
        totalGroups,
        openedGroups,
        unopenedGroups,
        totalVisits,
        openRate,
      },

      opened,
      unopened,
    })
  } catch (error) {
    console.error(
      'Invitation visits summary error:',
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
