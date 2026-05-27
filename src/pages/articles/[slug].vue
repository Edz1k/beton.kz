<script setup lang="ts">
import type { Article } from '~/services/articles'
import { useHead, useSeoMeta } from '@unhead/vue'
import {
  defineArticle,
  defineBreadcrumb,
  defineQuestion,
  defineWebPage,
  useSchemaOrg,
} from '@vueuse/schema-org'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  fetchArticleBySlug,
  getArticleCanonicalUrl,
  getArticleCategory,
  getArticleCategoryUrl,
  getArticleFaq,
  getArticleKeywords,
  getArticleModifiedTime,
  getArticlePreviewImage,
  getArticleRelatedLinks,
  getArticleSeoDescription,
  getArticleSeoTitle,
  getDirectusAssetUrl,
} from '~/services/articles'

defineOptions({
  name: 'ArticleSlugPage',
})

const route = useRoute('/articles/[slug]')
const slug = computed(() => String(route.params.slug || ''))

function formatDate(date?: string | null) {
  if (!date)
    return ''

  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

let article: Article | null = null
let error = ''

try {
  article = await fetchArticleBySlug(slug.value)

  if (!article)
    error = 'Статья не найдена'
}
catch (err) {
  console.error(err)
  error = 'Не удалось загрузить статью'
}

const canonicalUrl = computed(() => article ? getArticleCanonicalUrl(article) : `https://mg-beton.kz/articles/${slug.value}`)

const pageTitle = computed(() => {
  return getArticleSeoTitle(article)
})

const pageDescription = computed(() => {
  return getArticleSeoDescription(article)
})

const pageImage = computed(() => {
  return article ? getArticlePreviewImage(article) : null
})

const articleCategory = computed(() => getArticleCategory(article?.category))

const articleFaq = computed(() => getArticleFaq(article))

const relatedLinks = computed(() => getArticleRelatedLinks(article))

useHead({
  link: [
    { rel: 'canonical', href: canonicalUrl.value },
  ],
})

useSeoMeta({
  title: () => pageTitle.value,
  description: () => pageDescription.value,
  keywords: () => getArticleKeywords(article),

  ogTitle: () => pageTitle.value,
  ogDescription: () => pageDescription.value,
  ogType: 'article',
  ogUrl: () => canonicalUrl.value,
  ogImage: () => pageImage.value || undefined,

  twitterCard: 'summary_large_image',
  twitterTitle: () => pageTitle.value,
  twitterDescription: () => pageDescription.value,
  twitterImage: () => pageImage.value || undefined,

  articlePublishedTime: () => article?.created_at || undefined,
  articleModifiedTime: () => getArticleModifiedTime(article),
})

useSchemaOrg([
  defineWebPage({
    name: () => pageTitle.value,
    description: () => pageDescription.value,
    url: () => canonicalUrl.value,

  }),

  defineArticle({
    headline: article?.title || 'Статья MG Бетон',
    description: pageDescription.value,
    image: pageImage.value || undefined,
    datePublished: article?.created_at || undefined,
    dateModified: getArticleModifiedTime(article),
    author: {
      '@type': 'Organization',
      'name': 'MG Бетон',
    },
    publisher: {
      '@type': 'Organization',
      'name': 'MG Бетон',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://mg-beton.kz/logo.png',
      },
    },
    mainEntityOfPage: canonicalUrl.value,
  }),

  defineBreadcrumb({
    itemListElement: [
      {
        name: 'Главная',
        item: 'https://mg-beton.kz',
      },
      {
        name: 'Гид',
        item: 'https://mg-beton.kz/articles',
      },
      ...(articleCategory.value
        ? [{
            name: articleCategory.value.label,
            item: getArticleCategoryUrl(articleCategory.value.slug),
          }]
        : []),
      {
        name: article?.title || 'Статья',
        item: canonicalUrl.value,
      },
    ],
  }),
])

if (articleFaq.value.length) {
  defineQuestion({
    mainEntity: articleFaq.value.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer,
      },
    })),
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
          <template v-if="articleCategory">
            <span>/</span>
            <RouterLink
              :to="`/articles/category/${articleCategory.slug}`"
              class="transition hover:text-blue-700"
            >
              {{ articleCategory.label }}
            </RouterLink>
          </template>
          <span v-if="article">/</span>
          <span v-if="article" class="text-slate-700">
            {{ article.title }}
          </span>
        </div>
      </div>
    </div>

    <section class="bg-slate-50 relative overflow-hidden">
      <div class="mx-auto px-4 py-10 relative md:py-14 container">
        <div class="mx-auto max-w-4xl">
          <p v-if="error" class="text-red-600 py-20 text-center">
            {{ error }}
          </p>

          <template v-else-if="article">
            <div class="mb-5 flex flex-wrap gap-3 items-center">
              <span class="text-sm text-blue-700 font-medium px-4 py-2 border border-blue-100 rounded-full bg-blue-50 inline-flex">
                {{ articleCategory?.label || 'Полезный материал' }}
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
              class="article-content prose prose-slate prose-headings:font-bold prose-headings:text-slate-900 prose-p:break-words prose-p:leading-8 prose-p:text-slate-700 prose-a:break-words prose-a:text-blue-700 prose-a:no-underline prose-strong:text-slate-900 prose-li:break-words prose-li:text-slate-700 prose-blockquote:border-blue-200 prose-blockquote:text-slate-700 prose-img:h-auto prose-img:max-w-full prose-img:rounded-2xl prose-pre:overflow-x-auto prose-code:break-words prose-table:block prose-table:max-w-full prose-table:overflow-x-auto prose-td:break-words prose-th:break-words hover:prose-a:text-blue-800 max-w-none break-words [&_*]:max-w-full"
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

            <section
              v-if="relatedLinks.length"
              class="mt-14"
            >
              <div class="mb-6">
                <h2 class="text-2xl text-slate-900 font-bold md:text-3xl">
                  Полезные страницы по теме
                </h2>
                <p class="text-sm text-slate-600 leading-6 mt-2">
                  Быстрые переходы к материалам, расчетам и услугам, которые дополняют эту статью.
                </p>
              </div>

              <div class="gap-4 grid md:grid-cols-2">
                <RouterLink
                  v-for="link in relatedLinks"
                  :key="link.url"
                  :to="link.url"
                  class="group p-5 border border-slate-200 rounded-3xl bg-white transition hover:border-blue-200 hover:shadow-sm hover:-translate-y-0.5"
                >
                  <div class="flex gap-4 items-start justify-between">
                    <div>
                      <h3 class="text-lg text-slate-900 font-bold group-hover:text-blue-700">
                        {{ link.title }}
                      </h3>
                      <p
                        v-if="link.description"
                        class="text-sm text-slate-600 leading-6 mt-2"
                      >
                        {{ link.description }}
                      </p>
                    </div>

                    <div class="text-blue-700 rounded-2xl bg-blue-50 flex shrink-0 h-11 w-11 items-center justify-center">
                      <div class="i-mdi:arrow-top-right h-5 w-5" />
                    </div>
                  </div>
                </RouterLink>
              </div>
            </section>

            <section
              v-if="articleFaq.length"
              class="mt-14"
            >
              <h2 class="text-2xl text-slate-900 font-bold mb-6 md:text-3xl">
                Частые вопросы по теме
              </h2>

              <div class="space-y-4">
                <div
                  v-for="item in articleFaq"
                  :key="item.question"
                  class="p-5 border border-slate-200 rounded-3xl bg-slate-50"
                >
                  <h3 class="text-lg text-slate-900 font-bold">
                    {{ item.question }}
                  </h3>
                  <p class="text-sm text-slate-600 leading-6 mt-2">
                    {{ item.answer }}
                  </p>
                </div>
              </div>
            </section>

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
                  v-if="articleCategory"
                  :to="`/articles/category/${articleCategory.slug}`"
                  class="text-sm text-slate-700 font-medium px-4 py-3 border border-slate-200 rounded-2xl flex transition items-center justify-between hover:text-blue-700 hover:border-blue-200"
                >
                  {{ articleCategory.label }}
                  <span>→</span>
                </RouterLink>

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

<style scoped>
.article-content :deep(h2) {
  margin: 2.25rem 0 1rem;
  color: #0f172a;
  font-size: 1.75rem;
  line-height: 1.2;
  font-weight: 800;
}

.article-content :deep(h3) {
  margin: 1.75rem 0 0.75rem;
  color: #0f172a;
  font-size: 1.25rem;
  line-height: 1.3;
  font-weight: 700;
}

.article-content :deep(p) {
  margin: 1rem 0;
  color: #334155;
  font-size: 1rem;
  line-height: 1.85;
}

.article-content :deep(a) {
  color: #1d4ed8;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.article-content :deep(a:hover) {
  color: #1e40af;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin: 1rem 0 1.25rem 1.25rem;
  color: #334155;
  line-height: 1.8;
}

.article-content :deep(ul) {
  list-style: disc;
}

.article-content :deep(ol) {
  list-style: decimal;
}

.article-content :deep(li) {
  margin: 0.4rem 0;
  padding-left: 0.25rem;
}

.article-content :deep(table) {
  display: table;
  width: 100%;
  margin: 1.5rem 0 2rem;
  border-collapse: collapse;
  overflow: hidden;
  border: 1px solid #dbe3ef;
  border-radius: 16px;
  background: #fff;
  font-size: 0.95rem;
}

.article-content :deep(th),
.article-content :deep(td) {
  padding: 1rem;
  border: 1px solid #dbe3ef;
  vertical-align: top;
  color: #334155;
  line-height: 1.55;
  text-align: left;
}

.article-content :deep(th) {
  background: #f8fafc;
  color: #0f172a;
  font-weight: 800;
}

.article-content :deep(blockquote) {
  margin: 1.5rem 0;
  padding: 1rem 1.25rem;
  border-left: 4px solid #2563eb;
  border-radius: 0 16px 16px 0;
  background: #eff6ff;
  color: #334155;
}

@media (max-width: 640px) {
  .article-content :deep(table) {
    display: block;
    overflow-x: auto;
    border-radius: 12px;
  }

  .article-content :deep(th),
  .article-content :deep(td) {
    min-width: 180px;
    padding: 0.85rem;
  }
}
</style>
