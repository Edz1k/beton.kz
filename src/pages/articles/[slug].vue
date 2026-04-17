<script setup lang="ts">
import type { Article } from '~/services/articles'
import { useHead, useSeoMeta } from '@unhead/vue'
import {
  defineArticle,
  defineBreadcrumb,
  defineWebPage,
  useSchemaOrg,
} from '@vueuse/schema-org'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  fetchArticleBySlug,
  getArticlePreviewImage,
  getDirectusAssetUrl,
} from '~/services/articles'

defineOptions({
  name: 'ArticlePage',
})

const route = useRoute()

const slug = computed(() => {
  const params = route.params

  return 'slug' in params && typeof params.slug === 'string'
    ? params.slug
    : ''
})

const isValidSlug = computed(() => {
  return !!slug.value && slug.value !== ':slug' && slug.value !== 'undefined'
})

let article: Article | null = null
let error = ''

try {
  if (isValidSlug.value) {
    article = await fetchArticleBySlug(slug.value)

    if (!article)
      error = 'Статья не найдена'
  }
  else {
    error = 'Статья не найдена'
  }
}
catch (err) {
  console.error('Failed to fetch article:', err)
  error = 'Не удалось загрузить статью'
}

const articleUrl = computed(() =>
  article
    ? `https://mg-beton.kz/articles/${slug.value}`
    : 'https://mg-beton.kz/articles',
)

const articleImage = computed(() => {
  if (!article)
    return null

  return getArticlePreviewImage(article)
})

const pageTitle = computed(() =>
  article?.title
    ? `${article.title} — MG Бетон`
    : 'Статья — MG Бетон',
)

const pageDescription = computed(() =>
  article?.description || 'Полезная статья от MG Бетон.',
)

function formatDate(date?: string | null) {
  if (!date)
    return ''

  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

useSeoMeta({
  title: () => pageTitle.value,
  description: () => pageDescription.value,
  ogTitle: () => pageTitle.value,
  ogDescription: () => pageDescription.value,
  ogUrl: () => articleUrl.value,
  ogImage: () => articleImage.value || undefined,
  twitterCard: 'summary_large_image',
  twitterTitle: () => pageTitle.value,
  twitterDescription: () => pageDescription.value,
  twitterImage: () => articleImage.value || undefined,
})

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: articleUrl.value,
    },
  ],
}))

useSchemaOrg([
  defineWebPage({
    name: pageTitle.value,
    description: pageDescription.value,
    url: articleUrl.value,
  }),
])

if (article) {
  defineArticle({
    headline: article.title,
    description: article.description || 'Полезная статья от MG Бетон.',
    image: articleImage.value || undefined,
    datePublished: article.created_at || undefined,
    dateModified: article.created_at || undefined,
    author: 'MG Бетон',
    mainEntityOfPage: articleUrl.value,
    publisher: {
      '@type': 'Organization',
      'name': 'MG Бетон',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://mg-beton.kz/logo.png',
      },
    },
  })

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
        name: article.title,
        item: articleUrl.value,
      },
    ],
  })
}
</script>

<template>
  <article class="bg-white min-h-screen">
    <div class="border-b border-slate-200 bg-slate-50/70">
      <div class="mx-auto px-4 py-4 container">
        <div class="text-sm text-slate-500 flex flex-wrap gap-2 items-center">
          <RouterLink to="/" class="transition hover:text-blue-700">
            Главная
          </RouterLink>
          <span>/</span>
          <RouterLink to="/articles" class="transition hover:text-blue-700">
            Гид
          </RouterLink>
          <span v-if="article">/</span>
          <span v-if="article" class="text-slate-700">
            {{ article.title }}
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
          <p v-if="error" class="text-red-600 py-20 text-center">
            {{ error }}
          </p>

          <template v-else-if="article">
            <div class="mb-5 flex flex-wrap gap-3 items-center">
              <span class="text-sm text-blue-700 font-medium px-4 py-2 border border-blue-100 rounded-full bg-blue-50 inline-flex">
                Полезный материал
              </span>

              <span
                v-if="article.created_at"
                class="text-sm text-slate-500 font-medium"
              >
                {{ formatDate(article.created_at) }}
              </span>
            </div>

            <h1 class="text-4xl text-slate-900 leading-tight font-bold max-w-3xl md:text-5xl xl:text-6xl">
              {{ article.title }}
            </h1>

            <p
              v-if="article.description"
              class="text-lg text-slate-600 leading-8 mt-6 max-w-3xl md:text-xl"
            >
              {{ article.description }}
            </p>

            <div class="mt-8 flex flex-wrap gap-4 items-center">
              <RouterLink
                to="/articles"
                class="text-sm text-slate-700 font-medium px-5 py-3 border border-slate-200 rounded-full bg-white inline-flex gap-2 shadow-sm transition items-center hover:text-blue-700 hover:border-blue-200"
              >
                ← Ко всем статьям
              </RouterLink>

              <RouterLink
                to="/"
                class="text-sm text-white font-medium px-5 py-3 rounded-full bg-blue-600 inline-flex gap-2 shadow-sm transition items-center hover:bg-blue-700"
              >
                Купить бетон
              </RouterLink>
            </div>
          </template>
        </div>
      </div>
    </section>

    <section v-if="article && getArticlePreviewImage(article)" class="bg-white">
      <div class="mx-auto px-4 pb-4 container">
        <div class="mx-auto border border-slate-200 rounded-[32px] bg-white max-w-5xl shadow-sm overflow-hidden">
          <img
            :src="getArticlePreviewImage(article) || ''"
            :alt="article.title"
            class="max-h-[620px] w-full object-cover"
          >
        </div>
      </div>
    </section>

    <section v-if="article" class="bg-white">
      <div class="mx-auto px-4 py-10 md:py-14 container">
        <div class="mx-auto gap-10 grid max-w-6xl lg:grid-cols-[1fr_320px]">
          <div class="min-w-0">
            <div
              class="prose prose-slate prose-headings:font-bold prose-headings:text-slate-900 prose-p:break-words prose-p:leading-8 prose-p:text-slate-700 prose-a:break-words prose-a:text-blue-700 prose-a:no-underline prose-strong:text-slate-900 prose-li:break-words prose-li:text-slate-700 prose-blockquote:border-blue-200 prose-blockquote:text-slate-700 prose-img:h-auto prose-img:max-w-full prose-img:rounded-2xl prose-pre:overflow-x-auto prose-code:break-words prose-table:block prose-table:max-w-full prose-table:overflow-x-auto prose-td:break-words prose-th:break-words hover:prose-a:text-blue-800 max-w-none break-words [&_*]:max-w-full"
              v-html="article.content || ''"
            />

            <div
              v-if="article.images && article.images.length > 1"
              class="mt-14"
            >
              <div class="mb-6 flex items-center justify-between">
                <h2 class="text-2xl text-slate-900 font-bold md:text-3xl">
                  Дополнительные изображения
                </h2>
              </div>

              <div class="gap-4 grid md:grid-cols-2">
                <img
                  v-for="image in article.images.slice(1)"
                  :key="image.id"
                  :src="getDirectusAssetUrl(image.directus_files_id) || ''"
                  :alt="article.title"
                  class="border border-slate-200 rounded-3xl h-full w-full shadow-sm object-cover"
                  loading="lazy"
                >
              </div>
            </div>

            <div class="mt-16 p-8 border border-slate-200 rounded-[32px] bg-slate-50 md:p-10">
              <div class="max-w-2xl">
                <span class="text-sm text-slate-700 font-medium px-4 py-2 rounded-full bg-white inline-flex ring-1 ring-slate-200">
                  Нужна консультация?
                </span>

                <h2 class="text-3xl text-slate-900 font-bold mt-4">
                  Поможем подобрать бетон или керамзит под вашу задачу
                </h2>

                <p class="text-base text-slate-600 leading-7 mt-4">
                  Подскажем по марке бетона, объёму, доставке и стоимости.
                  Если вы не уверены в выборе, просто оставьте заявку или свяжитесь с нами.
                </p>

                <div class="mt-6 gap-3 grid sm:grid-cols-2">
                  <RouterLink
                    to="/"
                    class="text-sm text-white font-medium px-6 py-3 rounded-full bg-blue-600 inline-flex transition items-center justify-center hover:bg-blue-700"
                  >
                    Перейти к каталогу бетона
                  </RouterLink>

                  <RouterLink
                    to="/keramzit"
                    class="text-sm text-slate-700 font-medium px-6 py-3 border border-slate-300 rounded-full bg-white inline-flex transition items-center justify-center hover:text-blue-700 hover:border-blue-200"
                  >
                    Смотреть керамзит
                  </RouterLink>
                </div>

                <div class="mt-4 gap-3 grid sm:grid-cols-2 xl:grid-cols-3">
                  <RouterLink to="/beton/m150" class="text-sm text-slate-700 font-medium px-4 py-3 border border-slate-200 rounded-2xl bg-white transition hover:text-blue-700 hover:border-blue-200">
                    Бетон М150
                  </RouterLink>
                  <RouterLink to="/beton/m200" class="text-sm text-slate-700 font-medium px-4 py-3 border border-slate-200 rounded-2xl bg-white transition hover:text-blue-700 hover:border-blue-200">
                    Бетон М200
                  </RouterLink>
                  <RouterLink to="/beton/m250" class="text-sm text-slate-700 font-medium px-4 py-3 border border-slate-200 rounded-2xl bg-white transition hover:text-blue-700 hover:border-blue-200">
                    Бетон М250
                  </RouterLink>
                  <RouterLink to="/beton/m300" class="text-sm text-slate-700 font-medium px-4 py-3 border border-slate-200 rounded-2xl bg-white transition hover:text-blue-700 hover:border-blue-200">
                    Бетон М300
                  </RouterLink>
                  <RouterLink to="/beton/m350" class="text-sm text-slate-700 font-medium px-4 py-3 border border-slate-200 rounded-2xl bg-white transition hover:text-blue-700 hover:border-blue-200">
                    Бетон М350
                  </RouterLink>
                  <RouterLink to="/beton/m400" class="text-sm text-slate-700 font-medium px-4 py-3 border border-slate-200 rounded-2xl bg-white transition hover:text-blue-700 hover:border-blue-200">
                    Бетон М400
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>

          <aside class="lg:self-start lg:top-24 lg:sticky">
            <div class="p-6 border border-slate-200 rounded-[28px] bg-white shadow-sm">
              <div class="text-sm text-slate-400 tracking-wide font-medium uppercase">
                Навигация
              </div>

              <h3 class="text-xl text-slate-900 font-bold mt-3">
                Полезные разделы
              </h3>

              <p class="text-sm text-slate-600 leading-6 mt-3">
                Переходите к статьям, главному каталогу и страницам популярных марок бетона.
              </p>

              <div class="mt-6 space-y-3">
                <RouterLink
                  to="/articles"
                  class="text-sm text-slate-700 font-medium px-4 py-3 border border-slate-200 rounded-2xl flex transition items-center justify-between hover:text-blue-700 hover:border-blue-200"
                >
                  Все статьи
                  <span>→</span>
                </RouterLink>

                <RouterLink
                  to="/"
                  class="text-sm text-slate-700 font-medium px-4 py-3 border border-slate-200 rounded-2xl flex transition items-center justify-between hover:text-blue-700 hover:border-blue-200"
                >
                  Каталог бетона
                  <span>→</span>
                </RouterLink>

                <RouterLink
                  to="/keramzit"
                  class="text-sm text-slate-700 font-medium px-4 py-3 border border-slate-200 rounded-2xl flex transition items-center justify-between hover:text-blue-700 hover:border-blue-200"
                >
                  Керамзит
                  <span>→</span>
                </RouterLink>
              </div>

              <div class="mt-6 pt-6 border-t border-slate-200">
                <div class="text-sm text-slate-500 font-medium mb-3">
                  Популярные марки
                </div>

                <div class="gap-3 grid grid-cols-2">
                  <RouterLink
                    to="/beton/m200"
                    class="text-sm text-slate-700 font-medium px-4 py-3 border border-slate-200 rounded-2xl transition hover:text-blue-700 hover:border-blue-200"
                  >
                    М200
                  </RouterLink>
                  <RouterLink
                    to="/beton/m250"
                    class="text-sm text-slate-700 font-medium px-4 py-3 border border-slate-200 rounded-2xl transition hover:text-blue-700 hover:border-blue-200"
                  >
                    М250
                  </RouterLink>
                  <RouterLink
                    to="/beton/m300"
                    class="text-sm text-slate-700 font-medium px-4 py-3 border border-slate-200 rounded-2xl transition hover:text-blue-700 hover:border-blue-200"
                  >
                    М300
                  </RouterLink>
                  <RouterLink
                    to="/beton/m350"
                    class="text-sm text-slate-700 font-medium px-4 py-3 border border-slate-200 rounded-2xl transition hover:text-blue-700 hover:border-blue-200"
                  >
                    М350
                  </RouterLink>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </article>
</template>
