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

function authHeaders(): Record<string, string> {
  return STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}
}

export function strapiImageUrl(image: StrapiImage): string {
  if (image.url.startsWith('http')) return image.url
  return `${STRAPI_URL}${image.url}`
}

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
    'status': 'published',
  })
  const res = await fetch(`${STRAPI_URL}/api/posts?${params}`, {
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error(`Strapi ${res.status}: ${res.statusText}`)
  const json = await res.json()
  return { data: json.data ?? [], pagination: json.meta?.pagination }
}

export async function getPostBySlug(slug: string): Promise<StrapiPost | null> {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'populate[coverImage][fields][0]': 'url',
    'populate[coverImage][fields][1]': 'alternativeText',
    'populate[coverImage][fields][2]': 'formats',
    'status': 'published',
  })
  const res = await fetch(`${STRAPI_URL}/api/posts?${params}`, {
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error(`Strapi ${res.status}: ${res.statusText}`)
  const json = await res.json()
  return json.data?.[0] ?? null
}
