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

const sectionDefinitions = [
  {
    id: 'inicio',
    label: 'Inicio',
    shortLabel: 'Inicio',
  },
  {
    id: 'boda',
    label: 'El Gran Día',
    shortLabel: 'Gran día',
  },
  {
    id: 'informacion',
    label: 'Información',
    shortLabel: 'Info',
  },
  {
    id: 'hospedaje',
    label: 'Hospedaje',
    shortLabel: 'Hotel',
  },
  {
    id: 'transporte',
    label: 'Transporte',
    shortLabel: 'Bus',
  },
  {
    id: 'medellin',
    label: 'Medellín',
    shortLabel: 'Medellín',
  },
  {
    id: 'galeria',
    label: 'Galería',
    shortLabel: 'Galería',
  },
  {
    id: 'regalos',
    label: 'Regalos',
    shortLabel: 'Regalos',
  },
  {
    id: 'rsvp',
    label: 'RSVP',
    shortLabel: 'RSVP',
  },
]

const supabaseHeaders = (key) => ({
  apikey: key,
  Authorization: `Bearer ${key}`,
  'Content-Type': 'application/json',
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

    const { url, key } =
      getSupabaseConfig()

    if (!url || !key) {
      return json(
        {
          success: false,
          error: 'SERVER_CONFIGURATION',
        },
        500
      )
    }

    const [
      visitsResponse,
      pageViewsResponse,
    ] = await Promise.all([
      fetch(
        `${url}/rest/v1/invitation_visits` +
          `?select=ref_code,group_name,first_visit,last_visit,visit_count`,
        {
          headers: supabaseHeaders(key),
        }
      ),

      fetch(
        `${url}/rest/v1/invitation_page_views` +
          `?select=ref_code,section_name,first_visited_at,last_visited_at,visit_count`,
        {
          headers: supabaseHeaders(key),
        }
      ),
    ])

    if (!visitsResponse.ok) {
      const details =
        await visitsResponse.text()

      console.error(
        'Supabase invitation visits summary failed:',
        details
      )

      return json(
        {
          success: false,
          error: 'VISITS_LOOKUP',
        },
        500
      )
    }

    if (!pageViewsResponse.ok) {
      const details =
        await pageViewsResponse.text()

      console.error(
        'Supabase page views summary failed:',
        details
      )

      return json(
        {
          success: false,
          error: 'PAGE_VIEWS_LOOKUP',
        },
        500
      )
    }

    const visits =
      await visitsResponse.json()

    const pageViews =
      await pageViewsResponse.json()

    const anonymousVisits =
      visits.filter((row) =>
        String(row.ref_code || '').startsWith('ANON_')
      )

    const anonymousPageViews =
      pageViews.filter((row) =>
        String(row.ref_code || '').startsWith('ANON_')
      )

    const anonymousVisitorIds =
      new Set(
        anonymousVisits.map((row) => row.ref_code)
      )

    const anonymousSectionMetrics =
      sectionDefinitions.map((definition) => {
        const matchingRows =
          anonymousPageViews.filter(
            (row) =>
              row.section_name === definition.id
          )

        return {
          id: definition.id,
          label: definition.label,
          visitors:
            new Set(
              matchingRows.map((row) => row.ref_code)
            ).size,
          visits:
            matchingRows.reduce(
              (sum, row) =>
                sum + Number(row.visit_count || 0),
              0
            ),
        }
      })

    const anonymousSummary = {
      uniqueVisitors: anonymousVisitorIds.size,
      totalVisits:
        anonymousVisits.reduce(
          (sum, row) =>
            sum + Number(row.visit_count || 0),
          0
        ),
      totalSectionVisits:
        anonymousPageViews.reduce(
          (sum, row) =>
            sum + Number(row.visit_count || 0),
          0
        ),
      sectionMetrics:
        anonymousSectionMetrics,
    }

    const visitsByRef =
      new Map(
        visits.map((row) => [
          row.ref_code,
          row,
        ])
      )

    const pageViewsByRef =
      new Map()

    pageViews.forEach((row) => {
      if (!pageViewsByRef.has(row.ref_code)) {
        pageViewsByRef.set(
          row.ref_code,
          []
        )
      }

      pageViewsByRef
        .get(row.ref_code)
        .push(row)
    })

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

    const opened =
      allInvitations
        .filter((item) => item.opened)
        .sort(
          (a, b) =>
            new Date(b.lastVisit) -
            new Date(a.lastVisit)
        )

    const unopened =
      allInvitations
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
            (
              openedGroups /
              totalGroups
            ) * 100
          )
        : 0

    /*
      Build section activity for every invitation.
    */
    const activityGroups =
      allInvitations.map(
        (invitation) => {
          const groupPageViews =
            pageViewsByRef.get(
              invitation.refCode
            ) || []

          const pageViewMap =
            new Map(
              groupPageViews.map(
                (row) => [
                  row.section_name,
                  row,
                ]
              )
            )

          const sections =
            sectionDefinitions.map(
              (definition) => {
                const row =
                  pageViewMap.get(
                    definition.id
                  )

                return {
                  ...definition,
                  visited:
                    Boolean(row),
                  firstVisitedAt:
                    row?.first_visited_at ||
                    null,
                  lastVisitedAt:
                    row?.last_visited_at ||
                    null,
                  visitCount:
                    Number(
                      row?.visit_count || 0
                    ),
                }
              }
            )

          const visitedRows =
            groupPageViews
              .filter(
                (row) =>
                  row.last_visited_at
              )
              .sort(
                (a, b) =>
                  new Date(
                    b.last_visited_at
                  ) -
                  new Date(
                    a.last_visited_at
                  )
              )

          const lastRow =
            visitedRows[0] || null

          const lastDefinition =
            sectionDefinitions.find(
              (definition) =>
                definition.id ===
                lastRow?.section_name
            )

          return {
            ...invitation,

            sections,

            sectionsVisited:
              sections.filter(
                (section) =>
                  section.visited
              ).length,

            totalSectionVisits:
              sections.reduce(
                (sum, section) =>
                  sum +
                  section.visitCount,
                0
              ),

            lastActivity:
              lastRow
                ?.last_visited_at ||
              invitation.lastVisit ||
              null,

            lastSection:
              lastRow
                ?.section_name ||
              null,

            lastSectionLabel:
              lastDefinition
                ?.label ||
              null,
          }
        }
      )

    activityGroups.sort(
      (a, b) => {
        if (
          a.lastActivity &&
          b.lastActivity
        ) {
          return (
            new Date(
              b.lastActivity
            ) -
            new Date(
              a.lastActivity
            )
          )
        }

        if (a.lastActivity) return -1
        if (b.lastActivity) return 1

        return a.groupName.localeCompare(
          b.groupName,
          'es',
          {
            numeric: true,
          }
        )
      }
    )

    const groupsForSection =
      (sectionId) =>
        activityGroups.filter(
          (group) =>
            group.sections.some(
              (section) =>
                section.id ===
                  sectionId &&
                section.visited
            )
        ).length

    const activeGroups =
      activityGroups.filter(
        (group) =>
          group.sectionsVisited > 0
      ).length

    const sectionMetrics =
      sectionDefinitions.map(
        (definition) => ({
          id:
            definition.id,
          label:
            definition.label,
          groups:
            groupsForSection(
              definition.id
            ),
        })
      )

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

      anonymous: anonymousSummary,

      activity: {
        summary: {
          activeGroups,
          rsvpGroups:
            groupsForSection(
              'rsvp'
            ),
          hospedajeGroups:
            groupsForSection(
              'hospedaje'
            ),
          regalosGroups:
            groupsForSection(
              'regalos'
            ),
          medellinGroups:
            groupsForSection(
              'medellin'
            ),
        },

        sectionMetrics,
        groups:
          activityGroups,
      },
    })
  } catch (error) {
    console.error(
      'Invitation dashboard summary error:',
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
