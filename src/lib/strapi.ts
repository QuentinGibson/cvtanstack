const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337'
const STRAPI_TOKEN = process.env.STRAPI_TOKEN ?? ''

export type StrapiImage = {
  id: number
  url: string
  alternativeText?: string | null
  formats?: {
    thumbnail?: { url: string }
    small?: { url: string }
    medium?: { url: string }
  }
}

export type StrapiPost = {
  id: number
  documentId: string
  title: string
  slug: string
  excerpt?: string | null
  content: string
  coverImage?: StrapiImage | null
  tags?: string[] | null
  authorName?: string | null
  publishedAt: string
  createdAt: string
}

export type StrapiPagination = {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export type StrapiProject = {
  id: number
  documentId: string
  title: string
  slug: string
  category?: string | null
  description?: string | null
  client?: string | null
  date?: string | null
  skills?: string[] | null
  coverImage?: StrapiImage | null
  images?: StrapiImage[] | null
  isTall?: boolean | null
  isWide?: boolean | null
  order?: number | null
  publishedAt: string
}

function authHeaders(): Record<string, string> {
  return STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}
}

export function strapiImageUrl(image: StrapiImage): string {
  if (image.url.startsWith('http')) return image.url
  return `${STRAPI_URL}${image.url}`
}

async function strapiGet(path: string): Promise<any> {
  try {
    const res = await fetch(`${STRAPI_URL}${path}`, { headers: authHeaders() })
    if (!res.ok) {
      console.error(`[Strapi] ${res.status} ${res.statusText} — ${STRAPI_URL}${path}`)
      if (res.status === 403) console.error('[Strapi] 403: enable public permissions at Settings → Users & Permissions → Roles → Public')
      if (res.status === 404) console.error('[Strapi] 404: content type may not be registered — restart Strapi')
      return null
    }
    return res.json()
  } catch (err) {
    console.error(`[Strapi] fetch failed (is Strapi running at ${STRAPI_URL}?):`, err)
    return null
  }
}

// ── Projects ──────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<StrapiProject[]> {
  const params = new URLSearchParams({
    'populate[coverImage][fields][0]': 'url',
    'populate[coverImage][fields][1]': 'alternativeText',
    'sort[0]': 'order:asc',
    'sort[1]': 'publishedAt:desc',
    'pagination[pageSize]': '100',
  })
  const json = await strapiGet(`/api/projects?${params}`)
  return json?.data ?? []
}

export async function getProjectBySlug(slug: string): Promise<StrapiProject | null> {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'populate[coverImage][fields][0]': 'url',
    'populate[coverImage][fields][1]': 'alternativeText',
    'populate[images][fields][0]': 'url',
    'populate[images][fields][1]': 'alternativeText',
  })
  const json = await strapiGet(`/api/projects?${params}`)
  return json?.data?.[0] ?? null
}

// ── Posts ─────────────────────────────────────────────────────────────────────

export async function getPosts(
  page = 1,
  pageSize = 9,
): Promise<{ data: StrapiPost[]; pagination: StrapiPagination }> {
  const params = new URLSearchParams({
    'populate[coverImage][fields][0]': 'url',
    'populate[coverImage][fields][1]': 'alternativeText',
    'populate[coverImage][fields][2]': 'formats',
    'pagination[page]': String(page),
    'pagination[pageSize]': String(pageSize),
    'sort': 'publishedAt:desc',
  })
  const json = await strapiGet(`/api/posts?${params}`)
  return { data: json?.data ?? [], pagination: json?.meta?.pagination }
}

export async function getPostBySlug(slug: string): Promise<StrapiPost | null> {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'populate[coverImage][fields][0]': 'url',
    'populate[coverImage][fields][1]': 'alternativeText',
    'populate[coverImage][fields][2]': 'formats',
  })
  const json = await strapiGet(`/api/posts?${params}`)
  return json?.data?.[0] ?? null
}
