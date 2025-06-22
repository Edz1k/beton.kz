import { createHead } from '@unhead/vue/client'
import { ViteSSG } from 'vite-ssg'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'

export const createApp = ViteSSG(
  App,
  { routes },
  (ctx) => {
    const head = createHead()
    ctx.app.use(head)
    ctx.head = head
  },
)
