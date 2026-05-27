export interface ArticleImageItem {
  id: number
  articles_id: number
  directus_files_id: string
}

export interface ArticleFaqItem {
  question: string
  answer: string
}

export interface ArticleRelatedLink {
  title: string
  url: string
  description?: string | null
}

export interface ArticleCategory {
  slug: string
  label: string
  title: string
  description: string
}

export interface Article {
  id: number
  title: string
  slug: string
  category?: string | null
  description?: string | null
  content?: string | null
  published?: boolean
  created_at?: string | null
  date_updated?: string | null
  seo_title?: string | null
  seo_description?: string | null
  keywords?: string[] | string | null
  faq?: ArticleFaqItem[] | null
  related_links?: ArticleRelatedLink[] | null
  images?: ArticleImageItem[]
}

interface DirectusResponse<T> {
  data: T
}

const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL
const SITE_URL = 'https://mg-beton.kz'

export const articleCategories: ArticleCategory[] = [
  {
    slug: 'beton',
    label: 'Бетон',
    title: 'Статьи о бетоне в Алматы | MG Бетон',
    description: 'Полезные материалы о выборе бетона, марках, цене за куб, доставке и применении бетонных смесей в Алматы.',
  },
  {
    slug: 'keramzit',
    label: 'Керамзит',
    title: 'Статьи о керамзите в Алматы | MG Бетон',
    description: 'Гид по керамзиту: фракции, применение, утепление, стяжки, дренаж и доставка по Алматы.',
  },
  {
    slug: 'fundament',
    label: 'Фундамент',
    title: 'Статьи о бетоне для фундамента | MG Бетон',
    description: 'Как выбрать бетон для фундамента, какую марку заказать, как рассчитать объем и организовать доставку на объект.',
  },
  {
    slug: 'dostavka',
    label: 'Доставка',
    title: 'Статьи о доставке бетона и керамзита | MG Бетон',
    description: 'Материалы о доставке бетона, керамзита, расчете логистики, подъезде техники и подаче материалов на объект.',
  },
  {
    slug: 'betonnyj-nasos',
    label: 'Бетонный насос',
    title: 'Статьи о бетонном насосе | MG Бетон',
    description: 'Когда нужен бетонный насос, как организовать подачу бетона и что учитывать перед заливкой.',
  },
]

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

export function getArticleCategory(slug?: string | null): ArticleCategory | null {
  if (!slug)
    return null

  return articleCategories.find(category => category.slug === slug) ?? null
}

export function getArticleCategoryUrl(categorySlug: string): string {
  return `${SITE_URL}/articles/category/${categorySlug}`
}

export function getArticleFaq(article?: Article | null): ArticleFaqItem[] {
  return article?.faq?.filter(item => item.question && item.answer) ?? []
}

export function getArticleRelatedLinks(article?: Article | null): ArticleRelatedLink[] {
  return article?.related_links?.filter(item => item.title && item.url) ?? []
}

export async function fetchArticleSlugs(): Promise<string[]> {
  const articles = await fetchArticles()
  return articles
    .map(article => article.slug)
    .filter((slug): slug is string => Boolean(slug))
}

export async function fetchArticleCategorySlugs(): Promise<string[]> {
  const articles = await fetchArticles()
  const slugs = articles
    .map(article => article.category)
    .filter((slug): slug is string => Boolean(slug))
    .filter(slug => Boolean(getArticleCategory(slug)))

  return Array.from(new Set(slugs))
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

export async function fetchArticlesByCategory(category: string): Promise<Article[]> {
  const url = createDirectusUrl('/items/articles')

  url.searchParams.set('filter[published][_eq]', 'true')
  url.searchParams.set('filter[category][_eq]', category)
  url.searchParams.set('sort', '-created_at')
  url.searchParams.set(
    'fields',
    '*,images.id,images.articles_id,images.directus_files_id',
  )

  const response = await fetch(url.toString())

  if (!response.ok)
    throw new Error(`Failed to fetch articles by category: ${response.status}`)

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
