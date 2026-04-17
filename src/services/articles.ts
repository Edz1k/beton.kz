export interface ArticleImageItem {
  id: number
  articles_id: number
  directus_files_id: string
}

export interface Article {
  id: number
  title: string
  slug: string
  description?: string | null
  content?: string | null
  published?: boolean
  created_at?: string | null
  images?: ArticleImageItem[]
}

interface DirectusResponse<T> {
  data: T
}

const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL

export function getDirectusAssetUrl(fileId?: string | null): string | null {
  if (!fileId)
    return null

  return `${DIRECTUS_URL}/assets/${fileId}`
}

export function getArticlePreviewImage(article: Article): string | null {
  const fileId = article.images?.[0]?.directus_files_id
  return getDirectusAssetUrl(fileId)
}
export async function fetchArticleSlugs(): Promise<string[]> {
  const articles = await fetchArticles()
  return articles
    .map(article => article.slug)
    .filter((slug): slug is string => Boolean(slug))
}
export async function fetchArticles(): Promise<Article[]> {
  const url = new URL(`${DIRECTUS_URL}/items/articles`)

  url.searchParams.set('filter[published][_eq]', 'true')
  url.searchParams.set('sort', '-created_at')
  url.searchParams.set(
    'fields',
    'id,title,slug,description,created_at,images.id,images.articles_id,images.directus_files_id',
  )

  const response = await fetch(url.toString())

  if (!response.ok)
    throw new Error(`Failed to fetch articles: ${response.status}`)

  const json = await response.json() as DirectusResponse<Article[]>
  return json.data
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  const url = new URL(`${DIRECTUS_URL}/items/articles`)

  url.searchParams.set('filter[slug][_eq]', slug)
  url.searchParams.set('filter[published][_eq]', 'true')
  url.searchParams.set('limit', '1')
  url.searchParams.set(
    'fields',
    'id,title,slug,description,content,created_at,images.id,images.articles_id,images.directus_files_id',
  )

  const response = await fetch(url.toString())

  if (!response.ok)
    throw new Error(`Failed to fetch article: ${response.status}`)

  const json = await response.json() as DirectusResponse<Article[]>
  return json.data[0] ?? null
}
