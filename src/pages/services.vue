<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'
import {
  defineWebPage,
  useSchemaOrg,
} from '@vueuse/schema-org'

defineOptions({
  name: 'PumpServicePage',
})

// SEO мета-теги
useSeoMeta({
  title: 'Аренда бетонного насоса в Алматы — MG Бетон',
  description: 'Услуги аренды автобетононасоса с разной длиной стрелы от 32 до 65 м. Стационарные и мобильные насосы. Доставка, подача, операторы.',
  ogTitle: 'Бетонный насос — аренда в Алматы | MG Бетон',
  ogDescription: 'Аренда автобетононасосов от 30 000 ₸ в час. Подача на высоту до 65 метров. Опытные операторы и точная работа.',
  ogUrl: 'https://mg-beton.kz/services',
  twitterCard: 'summary',
  twitterTitle: 'Бетонный насос — MG Бетон',
  twitterDescription: 'Подача бетона до 65 метров. Услуги автобетононасосов в Алматы.',
})

// Schema.org разметка
useSchemaOrg([
  defineWebPage({
    name: 'Аренда бетонного насоса | MG Бетон',
    description: 'Аренда автобетононасосов и стационарных насосов от 30 000 ₸/час. С выездом по Алматы и области.',
    url: 'https://mg-beton.kz/services',
  }),
])
</script>

<template>
  <section
    id="hero"
    class="bg-[url('/nasos/hero.png')] flex min-h-screen items-center relative bg-cover bg-center"
  >
    <div class="bg-black/60 inset-0 absolute z-0" aria-hidden="true" />

    <div class="mx-auto px-4 relative z-10 container">
      <div class="text-white py-12 flex flex-col min-h-[70vh] items-start justify-center md:items-start">
        <div class="text-center w-full space-y-6 md:text-left md:w-1/2">
          <h1 class="text-4xl leading-tight font-bold md:text-6xl sm:text-5xl">
            Услуги аренды Бетонного насоса в Алматы
          </h1>
          <p class="text-base sm:text-lg">
            Компания «MG Бетон» предоставляет керамзит для строительных и утеплительных работ с гарантией качества и быстрой доставкой по Алматы.
          </p>
          <div class="mt-6">
            <RequestModal />
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="services" class="px-4 py-16 bg-gray-50 scroll-mt-16">
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
                ['47 метров', '12м x 12м', '4 часов', 'от 40 000 тг'],
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
  </section>
</template>
