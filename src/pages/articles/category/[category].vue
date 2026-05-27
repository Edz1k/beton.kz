<script setup lang="ts">
import type { Article } from '~/services/articles'
import { useHead, useSeoMeta } from '@unhead/vue'
import { defineBreadcrumb, defineWebPage, useSchemaOrg } from '@vueuse/schema-org'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  fetchArticlesByCategory,
  getArticleCategory,
  getArticleCategoryUrl,
  getArticlePreviewImage,
} from '~/services/articles'

defineOptions({
  name: 'ArticleCategoryPage',
})

const route = useRoute()
const categorySlug = computed(() => {
  const params = route.params as Partial<Record<'category', string | string[]>>
  const categoryParam = params.category

  return Array.isArray(categoryParam) ? categoryParam[0] : String(categoryParam || '')
})
const category = computed(() => getArticleCategory(categorySlug.value))

function formatDate(date?: string | null) {
  if (!date)
    return ''

  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

let articles: Article[] = []
let error = ''

try {
  if (category.value)
    articles = await fetchArticlesByCategory(category.value.slug)
  else
    error = 'Категория не найдена'
}
catch (err) {
  console.error('FETCH ARTICLE CATEGORY ERROR:', err)
  error = 'Не удалось загрузить статьи категории'
}

const canonicalUrl = computed(() =>
  category.value ? getArticleCategoryUrl(category.value.slug) : 'https://mg-beton.kz/articles',
)

const pageTitle = computed(() =>
  category.value?.title ?? 'Категория статей | MG Бетон',
)

const pageDescription = computed(() =>
  category.value?.description ?? 'Полезные статьи MG Бетон о бетоне, керамзите, доставке и строительстве в Алматы.',
)

const pageImage = computed(() => {
  if (!articles.length)
    return 'https://mg-beton.kz/logo.png'

  return getArticlePreviewImage(articles[0]) || 'https://mg-beton.kz/logo.png'
})

useHead({
  link: [
    { rel: 'canonical', href: canonicalUrl.value },
  ],
})

useSeoMeta({
  title: () => pageTitle.value,
  description: () => pageDescription.value,
  ogTitle: () => pageTitle.value,
  ogDescription: () => pageDescription.value,
  ogType: 'website',
  ogUrl: () => canonicalUrl.value,
  ogImage: () => pageImage.value,
  twitterCard: 'summary_large_image',
  twitterTitle: () => pageTitle.value,
  twitterDescription: () => pageDescription.value,
  twitterImage: () => pageImage.value,
})

useSchemaOrg([
  defineWebPage({
    name: () => pageTitle.value,
    description: () => pageDescription.value,
    url: () => canonicalUrl.value,
  }),
  defineBreadcrumb({
    itemListElement: [
      {
        name: 'Главная',
        item: 'https://mg-beton.kz/',
      },
      {
        name: 'Гид',
        item: 'https://mg-beton.kz/articles',
      },
      {
        name: category.value?.label || 'Категория',
        item: canonicalUrl.value,
      },
    ],
  }),
])
</script>

<template>
  <section class="bg-slate-50">
    <div class="mx-auto px-4 py-14 md:py-18 container">
      <div class="mx-auto max-w-4xl">
        <div class="text-sm text-slate-500 mb-6 flex flex-wrap gap-2 items-center">
          <RouterLink to="/" class="transition hover:text-blue-700">
            Главная
          </RouterLink>
          <span>/</span>
          <RouterLink to="/articles" class="transition hover:text-blue-700">
            Гид
          </RouterLink>
          <span v-if="category">/</span>
          <span v-if="category" class="text-slate-700">
            {{ category.label }}
          </span>
        </div>

        <span class="text-sm text-blue-700 font-medium px-4 py-2 border border-blue-100 rounded-full bg-blue-50 inline-flex">
          {{ category?.label || 'Категория' }}
        </span>

        <h1 class="text-4xl text-slate-900 leading-tight font-bold mt-6 md:text-5xl">
          {{ category?.title || 'Категория статей' }}
        </h1>

        <p class="text-base text-slate-600 leading-7 mt-5 max-w-3xl md:text-lg">
          {{ category?.description || 'Полезные материалы MG Бетон.' }}
        </p>
      </div>
    </div>
  </section>

  <section class="bg-white">
    <div class="mx-auto px-4 py-12 md:py-16 container">
      <p v-if="error" class="text-red-600 py-10 text-center">
        {{ error }}
      </p>

      <div v-else-if="articles.length" class="gap-6 grid md:grid-cols-2 xl:grid-cols-3">
        <RouterLink
          v-for="article in articles"
          :key="article.id"
          :to="`/articles/${article.slug}`"
          class="group border border-slate-200 rounded-[28px] bg-white shadow-sm transition duration-300 overflow-hidden hover:shadow-xl hover:-translate-y-1"
        >
          <div class="relative overflow-hidden">
            <img
              v-if="getArticlePreviewImage(article)"
              :src="getArticlePreviewImage(article) || ''"
              :alt="article.title"
              class="h-56 w-full transition duration-500 object-cover group-hover:scale-105"
              loading="lazy"
            >

            <div
              v-else
              class="text-sm text-slate-500 font-medium bg-slate-100 flex h-56 items-center justify-center"
            >
              MG Бетон
            </div>
          </div>

          <div class="p-6">
            <div
              v-if="article.created_at"
              class="text-xs text-slate-400 tracking-wide font-medium mb-3 uppercase"
            >
              {{ formatDate(article.created_at) }}
            </div>

            <h2 class="text-xl text-slate-900 leading-snug font-bold transition line-clamp-2 group-hover:text-blue-700">
              {{ article.title }}
            </h2>

            <p
              v-if="article.description"
              class="text-sm text-slate-600 leading-6 mt-3 line-clamp-3"
            >
              {{ article.description }}
            </p>

            <div class="mt-5 flex items-center justify-between">
              <span class="text-sm text-blue-700 font-medium">
                Читать подробнее
              </span>
              <span class="text-lg text-slate-400 transition duration-300 group-hover:text-blue-700 group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>
        </RouterLink>
      </div>

      <div
        v-else
        class="px-6 py-14 text-center border border-slate-300 rounded-3xl border-dashed bg-slate-50"
      >
        <h2 class="text-2xl text-slate-900 font-bold">
          В этой категории пока нет статей
        </h2>
        <p class="text-slate-600 mt-3">
          Материалы появятся после публикации в Directus.
        </p>
      </div>
    </div>
  </section>
</template>
