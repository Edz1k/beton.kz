<script setup lang="ts">
import type { Article } from '~/services/articles'
import { onMounted, ref } from 'vue'
import { fetchArticles, getArticlePreviewImage } from '~/services/articles'

const articles = ref<Article[]>([])
const loading = ref(true)
const error = ref('')

function formatDate(date?: string | null) {
  if (!date)
    return ''

  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

onMounted(async () => {
  try {
    articles.value = await fetchArticles()
  }
  catch (err) {
    console.error(err)
    error.value = 'Не удалось загрузить статьи'
  }
  finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="bg-gradient-to-b relative overflow-hidden from-slate-50 to-white via-white">
    <div class="pointer-events-none inset-0 absolute">
      <div class="rounded-full bg-blue-100/50 h-60 w-60 absolute blur-3xl -left-20 -top-20" />
      <div class="rounded-full bg-orange-100/50 h-72 w-72 right-0 top-20 absolute blur-3xl" />
    </div>

    <div class="mx-auto px-4 py-14 relative md:py-20 container">
      <div class="mx-auto text-center max-w-4xl">
        <span class="text-sm text-blue-700 font-medium px-4 py-2 border border-blue-100 rounded-full bg-blue-50 inline-flex items-center">
          Полезные материалы MG Бетон
        </span>

        <h1 class="text-4xl text-slate-900 leading-tight font-bold mt-6 md:text-5xl xl:text-6xl">
          Гид по бетону и керамзиту
        </h1>

        <p class="text-base text-slate-600 leading-7 mx-auto mt-5 max-w-2xl md:text-lg">
          Практические статьи о выборе бетона, керамзита, применении марок,
          расчётах, доставке и строительных материалах в Алматы.
        </p>

        <div class="mt-8 flex flex-wrap gap-3 items-center justify-center">
          <span class="text-sm text-slate-700 px-4 py-2 border border-slate-200 rounded-full bg-white shadow-sm">
            Марки бетона
          </span>
          <span class="text-sm text-slate-700 px-4 py-2 border border-slate-200 rounded-full bg-white shadow-sm">
            Керамзит
          </span>
          <span class="text-sm text-slate-700 px-4 py-2 border border-slate-200 rounded-full bg-white shadow-sm">
            Советы по выбору
          </span>
          <span class="text-sm text-slate-700 px-4 py-2 border border-slate-200 rounded-full bg-white shadow-sm">
            Доставка и расчёты
          </span>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-white">
    <div class="mx-auto px-4 pb-16 md:pb-20 container">
      <div class="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 class="text-2xl text-slate-900 font-bold md:text-3xl">
            Последние статьи
          </h2>
          <p class="text-slate-600 mt-2">
            Подборка полезных материалов для клиентов и строителей.
          </p>
        </div>
      </div>

      <p v-if="loading" class="text-slate-500 py-10 text-center">
        Загрузка...
      </p>

      <p v-else-if="error" class="text-red-600 py-10 text-center">
        {{ error }}
      </p>

      <div v-else-if="articles.length" class="gap-6 grid md:grid-cols-2 xl:grid-cols-3">
        <RouterLink
          v-for="article in articles"
          :key="article.id"
          :to="`/articles/${article.slug}`"
          class="group border border-slate-200 rounded-[28px] bg-white shadow-sm transition duration-300 overflow-hidden hover:shadow-2xl hover:-translate-y-1"
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

            <div class="left-4 top-4 absolute">
              <span class="text-xs text-slate-700 font-medium px-3 py-1 rounded-full bg-white/90 backdrop-blur">
                Гид
              </span>
            </div>
          </div>

          <div class="p-6">
            <div
              v-if="article.created_at"
              class="text-xs text-slate-400 tracking-wide font-medium mb-3 uppercase"
            >
              {{ formatDate(article.created_at) }}
            </div>

            <h3 class="text-xl text-slate-900 leading-snug font-bold transition line-clamp-2 group-hover:text-blue-700">
              {{ article.title }}
            </h3>

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
          Раздел скоро наполнится
        </h2>
        <p class="text-slate-600 mt-3">
          Мы готовим полезные статьи о бетоне, керамзите и выборе строительных материалов.
        </p>
      </div>
    </div>
  </section>
</template>
