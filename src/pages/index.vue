<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'

defineOptions({
  name: 'IndexPage',
})

useSeoMeta({
  // Basic SEO
  title: 'Product Name - Your Brand',
  description: 'Detailed product description optimized for search engines.',

  // Open Graph
  ogTitle: 'Product Name - Your Brand',
  ogDescription: 'Engaging description for social media shares.',
  ogImage: 'https://example.com/product-social.jpg',
  ogUrl: 'https://example.com/products/my-product',
  ogSiteName: 'Your Brand',

  // Twitter
  twitterTitle: 'Product Name - Your Brand',
  twitterDescription: 'Engaging description for Twitter shares.',
  twitterImage: 'https://example.com/product-twitter.jpg',
  twitterCard: 'summary_large_image',

  // Product specific (structured data will be generated)
  articlePublishedTime: '2023-01-01',
  articleModifiedTime: '2023-02-15',
})

const grades = [
  {
    grade: 'M150',
    description: 'B12.5',
    price: '15 000',
    f: '100',
    image: '/beton/150.webp',
  },
  {
    grade: 'M200',
    description: 'B15',
    price: '15 500',
    f: '150',
    image: '/beton/200.webp',
  },
  {
    grade: 'M250',
    description: 'B20',
    price: '16 000',

    f: '200',
    image: '/beton/250.webp',
  },
  {
    grade: 'M300',
    description: 'B22.5',
    price: '16 500',
    f: '200',
    image: '/beton/300.webp',
  },
  {
    grade: 'M350',
    description: 'B25',
    price: '17 000',
    f: '300',
    image: '/beton/350.webp',
  },
  {
    grade: 'M400',
    description: 'B30',
    price: '18 000',
    f: '300',
    image: '/beton/400.webp',
  },
]
</script>

<template>
  <!-- HERO Section -->
  <section
    id="hero"
    class="bg-[url('/background.png')] flex min-h-screen items-center relative bg-cover bg-center"
  >
    <div class="bg-black/60 inset-0 absolute z-0" aria-hidden="true" />

    <div class="mx-auto px-4 relative z-10 container">
      <div class="text-white py-12 flex flex-col min-h-[70vh] items-start justify-center md:items-start">
        <div class="text-center w-full space-y-6 md:text-left md:w-1/2">
          <h1 class="text-4xl leading-tight font-bold md:text-6xl sm:text-5xl">
            Бетон и керамзит с доставкой по Алматы от 15 000 ₸
          </h1>
          <p class="text-base sm:text-lg">
            Компания «MG Бетон» предлагает доставку и производство бетона, керамзита и растворов с гарантией качества по всей стране.
          </p>
          <div class="mt-6">
            <RequestModal />
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="calc" class="scroll-mt-16">
    <CalcTabs />
  </section>

  <section class="py-16 bg-gray-50">
    <div class="mx-auto px-4 container">
      <h2 class="text-3xl font-bold mb-10 text-center">
        Цены на бетон с доставкой в Алматы
      </h2>
      <p class="text-sm text-gray-500 mb-6 text-center">
        Все марки соответствуют ГОСТ. Цена указана без доставки. Позвоните — рассчитаем с доставкой.
      </p>
      <div class="gap-8 grid md:grid-cols-2 xl:grid-cols-3">
        <ConcreteGradeCard
          v-for="(grade, i) in grades"
          :key="i"
          v-bind="grade"
        />
      </div>
    </div>
  </section>

  <!-- CTA блок -->
  <section class="scroll-mt-16">
    <CTAComponent />
  </section>

  <FAQComponent />
  <!-- Таблица услуг -->
  <!-- <section id="services" class="px-4 py-16 bg-gray-50 scroll-mt-16">
    <div class="mx-auto text-center container">
      <h2 class="text-2xl text-gray-900 font-bold mb-8 sm:text-4xl">
        Услуги аренды бетонного насоса в Алматы
      </h2>

      <div class="border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
        <table class="text-sm text-gray-800 text-left min-w-full">
          <thead class="text-xs text-gray-700 tracking-wide font-semibold bg-gray-100 uppercase">
            <tr>
              <th class="px-4 py-3">
                Длина стрелы
              </th>
              <th class="px-4 py-3">
                Площадка
              </th>
              <th class="px-4 py-3">
                Мин. время
              </th>
              <th class="px-4 py-3">
                Цена (1 ч)
              </th>
            </tr>
          </thead>
          <tbody class="divide-gray-200 divide-y">
            <tr
              v-for="(item, index) in [
                ['Стационарный — 80 м', '3м x 8м', '3 часа', 'от 30 000 тг'],
                ['32 метра', '8м x 10м', '3 часа', 'от 35 000 тг'],
                ['37 метров', '10м x 10м', '3 часа', 'от 35 000 тг'],
                ['42 метра', '12м x 12м', '3 часа', 'от 40 000 тг'],
                ['47 метров', '12м x 12м', '5 часов', 'от 40 000 тг'],
                ['52 метра', '14м x 14м', '5 часов', 'от 45 000 тг'],
                ['62 метра', '15м x 15м', '5 часов', 'от 50 000 тг'],
                ['65 метра', '15м x 15м', '5 часов', 'от 55 000 тг'],
              ]" :key="index" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
            >
              <td class="font-medium px-4 py-3">
                {{ item[0] }}
              </td>
              <td class="px-4 py-3">
                {{ item[1] }}
              </td>
              <td class="px-4 py-3">
                {{ item[2] }}
              </td>
              <td class="text-main font-semibold px-4 py-3">
                {{ item[3] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-10 flex justify-center">
        <RequestModal />
      </div>
    </div>
  </section> -->
</template>
