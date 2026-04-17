<script setup lang="ts">
import type { Article } from '~/services/articles'
import { useHead, useSeoMeta } from '@unhead/vue'
import {
  defineBreadcrumb,
  defineWebPage,
  useSchemaOrg,
} from '@vueuse/schema-org'
import { computed } from 'vue'
import {
  fetchArticles,
  getArticlePreviewImage,
} from '~/services/articles'

defineOptions({
  name: 'ArticlesPage',
})

let articles: Article[] = []
let error = ''

try {
  articles = await fetchArticles()
}
catch (err) {
  console.error('Failed to fetch articles:', err)
  error = 'Не удалось загрузить статьи'
}

const pageTitle = 'Полезные статьи о бетоне и строительстве — MG Бетон'
const pageDescription = 'Читайте полезные статьи от MG Бетон: как выбрать марку бетона, рассчитать объём, заказать бетон с доставкой и избежать ошибок в строительстве.'

const pageUrl = 'https://mg-beton.kz/articles'

const hasArticles = computed(() => articles.length > 0)

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogUrl: pageUrl,
  twitterCard: 'summary',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: pageUrl,
    },
  ],
})

useSchemaOrg([
  defineWebPage({
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
  }),
  defineBreadcrumb({
    itemListElement: [
      {
        name: 'Главная',
        item: 'https://mg-beton.kz/',
      },
      {
        name: 'Гид',
        item: pageUrl,
      },
    ],
  }),
])

function formatDate(date?: string | null) {
  if (!date)
    return ''

  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
</script>

<template>
  <section class="bg-white min-h-screen">
    <div class="border-b border-slate-200 bg-slate-50/70">
      <div class="mx-auto px-4 py-4 container">
        <div class="text-sm text-slate-500 flex flex-wrap gap-2 items-center">
          <RouterLink to="/" class="transition hover:text-blue-700">
            Главная
          </RouterLink>
          <span>/</span>
          <span class="text-slate-700">
            Гид
          </span>
        </div>
      </div>
    </div>

    <section class="bg-gradient-to-b relative overflow-hidden from-slate-50 to-white via-white">
      <div class="pointer-events-none inset-0 absolute">
        <div class="rounded-full bg-blue-100/40 h-56 w-56 left-0 absolute blur-3xl -top-16" />
        <div class="rounded-full bg-orange-100/40 h-64 w-64 right-0 top-10 absolute blur-3xl" />
      </div>

      <div class="mx-auto px-4 py-10 relative md:py-14 container">
        <div class="mx-auto max-w-4xl">
          <div class="mb-5 flex flex-wrap gap-3 items-center">
            <span class="text-sm text-blue-700 font-medium px-4 py-2 border border-blue-100 rounded-full bg-blue-50 inline-flex">
              Полезные материалы
            </span>
          </div>

          <h1 class="text-4xl text-slate-900 leading-tight font-bold max-w-3xl md:text-5xl xl:text-6xl">
            Полезные статьи о бетоне и строительстве
          </h1>

          <p class="text-lg text-slate-600 leading-8 mt-6 max-w-3xl md:text-xl">
            Читайте полезные материалы от MG Бетон: как выбрать марку бетона, рассчитать объём, подготовиться к заливке и избежать распространённых ошибок.
          </p>
        </div>
      </div>
    </section>

    <section class="bg-white">
      <div class="mx-auto px-4 py-10 md:py-14 container">
        <p v-if="error" class="text-red-600 py-20 text-center">
          {{ error }}
        </p>

        <template v-else-if="hasArticles">
          <div class="gap-6 grid md:grid-cols-2 xl:grid-cols-3">
            <article
              v-for="article in articles"
              :key="article.id"
              class="group border border-slate-200 rounded-[28px] bg-white shadow-sm transition overflow-hidden hover:shadow-md hover:-translate-y-1"
            >
              <RouterLink :to="`/articles/${article.slug}`" class="block">
                <div
                  v-if="getArticlePreviewImage(article)"
                  class="bg-slate-100 aspect-[16/10] overflow-hidden"
                >
                  <img
                    :src="getArticlePreviewImage(article) || ''"
                    :alt="article.title"
                    class="h-full w-full transition duration-500 object-cover group-hover:scale-105"
                    loading="lazy"
                  >
                </div>

                <div class="p-6">
                  <div class="mb-4 flex flex-wrap gap-3 items-center">
                    <span class="text-xs text-blue-700 font-medium px-3 py-1 border border-blue-100 rounded-full bg-blue-50 inline-flex">
                      Статья
                    </span>

                    <span
                      v-if="article.created_at"
                      class="text-sm text-slate-500 font-medium"
                    >
                      {{ formatDate(article.created_at) }}
                    </span>
                  </div>

                  <h2 class="text-2xl text-slate-900 leading-snug font-bold transition group-hover:text-blue-700">
                    {{ article.title }}
                  </h2>

                  <p
                    v-if="article.description"
                    class="text-base text-slate-600 leading-7 mt-4 line-clamp-3"
                  >
                    {{ article.description }}
                  </p>

                  <div class="text-sm text-slate-700 font-medium mt-6 inline-flex gap-2 transition items-center group-hover:text-blue-700">
                    Читать статью
                    <span>→</span>
                  </div>
                </div>
              </RouterLink>
            </article>
          </div>
        </template>

        <section v-else class="py-20">
          <div class="mx-auto px-4 text-center max-w-3xl">
            <h2 class="text-3xl font-bold">
              Статей пока нет
            </h2>
            <p class="text-black/60 mt-4">
              Скоро здесь появятся полезные материалы о бетоне, керамзите и строительстве.
            </p>
            <div class="mt-6">
              <RouterLink
                to="/"
                class="text-sm font-medium px-5 py-3 border border-black/10 rounded-xl inline-flex transition items-center hover:border-black/30 hover:bg-gray-50"
              >
                На главную
              </RouterLink>
            </div>
          </div>
        </section>
      </div>
    </section>
  </section>
</template>
