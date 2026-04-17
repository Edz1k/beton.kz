import { SchemaOrgUnheadPlugin } from '@unhead/schema-org'
import { createHead } from '@unhead/vue/client'
import { ViteSSG } from 'vite-ssg'
import { routes } from 'vue-router/auto-routes'
import { concreteGrades } from '~/data/concrete-grades'

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

export function includedRoutes(paths: string[]) {
  return [
    ...paths,
    ...concreteGrades.map(item => `/beton/${item.slug}`),
  ]
}
