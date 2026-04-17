import { SchemaOrgUnheadPlugin } from '@unhead/schema-org'
import { createHead } from '@unhead/vue/client'
import { ViteSSG } from 'vite-ssg'
import { routes } from 'vue-router/auto-routes'
import { concreteGrades } from '~/data/concrete-grades'
import { fetchArticleSlugs } from '~/services/articles'

import App from './App.vue'
import './styles/main.css'

import 'uno.css'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior() {
      return { top: 0 }
    },
  },
  (ctx) => {
    const head = createHead()

    head.use(
      SchemaOrgUnheadPlugin(
        {
          host: 'https://mg-beton.kz',
          canonicalHost: 'https://mg-beton.kz',
        },
        () => ({
          title: 'MG Бетон',
          description: 'Продажа и доставка бетона и керамзита по Алматы',
        }),
      ),
    )

    ctx.app.use(head)
    ctx.head = head
  },
)

export async function includedRoutes(paths: string[]) {
  let articleRoutes: string[] = []

  try {
    const slugs = await fetchArticleSlugs()
    articleRoutes = slugs.map(slug => `/articles/${slug}`)
  }
  catch (error) {
    console.error('Failed to fetch article routes for SSG:', error)
  }

  const filteredPaths = paths.filter(path => path !== '/articles/:slug')

  return [
    ...filteredPaths,
    ...concreteGrades.map(item => `/beton/${item.slug}`),
    ...articleRoutes,
  ]
}
