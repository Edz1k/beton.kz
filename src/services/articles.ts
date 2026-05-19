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
  date_updated?: string | null
  seo_title?: string | null
  seo_description?: string | null
  keywords?: string[] | string | null
  images?: ArticleImageItem[]
}

interface DirectusResponse<T> {
  data: T
}

const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL
const SITE_URL = 'https://mg-beton.kz'

function createDirectusUrl(path: string) {
  if (!DIRECTUS_URL)
    throw new Error('VITE_DIRECTUS_URL is not configured')

  return new URL(path, DIRECTUS_URL)
}

function stripHtml(value?: string | null) {
  return value
    ?.replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() ?? ''
}

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength)
    return value

  return `${value.slice(0, maxLength - 1).trimEnd()}…`
}

export function getDirectusAssetUrl(fileId?: string | null): string | null {
  if (!fileId)
    return null

  if (!DIRECTUS_URL)
    return null

  return `${DIRECTUS_URL}/assets/${fileId}`
}

export function getArticlePreviewImage(article: Article): string | null {
  const fileId = article.images?.[0]?.directus_files_id
  return getDirectusAssetUrl(fileId)
}

export function getArticleCanonicalUrl(articleOrSlug: Article | string): string {
  const slug = typeof articleOrSlug === 'string' ? articleOrSlug : articleOrSlug.slug
  return `${SITE_URL}/articles/${slug}`
}

export function getArticleSeoTitle(article?: Article | null): string {
  if (!article)
    return 'Статья | MG Бетон'

  const title = article.seo_title || article.title
  return title.includes('MG Бетон') ? title : `${title} | MG Бетон`
}

export function getArticleSeoDescription(article?: Article | null): string {
  if (!article)
    return 'Полезная статья от MG Бетон о бетоне, керамзите, доставке и строительстве в Алматы.'

  const description = article.seo_description || article.description || stripHtml(article.content)
  return truncate(description || 'Полезная статья от MG Бетон.', 160)
}

export function getArticleKeywords(article?: Article | null): string | undefined {
  if (!article?.keywords)
    return undefined

  if (Array.isArray(article.keywords))
    return article.keywords.filter(Boolean).join(', ')

  return article.keywords || undefined
}

export function getArticleModifiedTime(article?: Article | null): string | undefined {
  return article?.date_updated || article?.created_at || undefined
}

export async function fetchArticleSlugs(): Promise<string[]> {
  const articles = await fetchArticles()
  return articles
    .map(article => article.slug)
    .filter((slug): slug is string => Boolean(slug))
}
export async function fetchArticles(): Promise<Article[]> {
  const url = createDirectusUrl('/items/articles')

  url.searchParams.set('filter[published][_eq]', 'true')
  url.searchParams.set('sort', '-created_at')
  url.searchParams.set(
    'fields',
    '*,images.id,images.articles_id,images.directus_files_id',
  )

  const response = await fetch(url.toString())

  if (!response.ok)
    throw new Error(`Failed to fetch articles: ${response.status}`)

  const json = await response.json() as DirectusResponse<Article[]>
  return json.data
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  const url = createDirectusUrl('/items/articles')

  url.searchParams.set('filter[slug][_eq]', slug)
  url.searchParams.set('filter[published][_eq]', 'true')
  url.searchParams.set('limit', '1')
  url.searchParams.set(
    'fields',
    '*,images.id,images.articles_id,images.directus_files_id',
  )

  const response = await fetch(url.toString())

  if (!response.ok)
    throw new Error(`Failed to fetch article: ${response.status}`)

  const json = await response.json() as DirectusResponse<Article[]>
  return json.data[0] ?? null
}
