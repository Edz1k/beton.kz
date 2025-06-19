import { createHead } from '@vueuse/head'
import { ViteSSG } from 'vite-ssg'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import './styles/main.css'
import 'uno.css'

export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
  },
  (ctx) => {
    const head = createHead()
    ctx.app.use(head)
  },
)
