<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'
import { defineLocalBusiness, defineProduct, defineQuestion, defineWebPage, defineWebSite, useSchemaOrg } from '@vueuse/schema-org'

defineOptions({
  name: 'IndexPage',
})

useSeoMeta({
  title: 'Бетон и керамзит с доставкой — MG Бетон',
  description: 'Бетон от 15 000 ₸. Керамзит. Доставка по Алматы за 2 часа.',
  ogTitle: 'Бетон и керамзит — MG Бетон',
  ogDescription: 'Быстрая доставка бетона и керамзита в Алматы.',
  ogUrl: 'https://mg-beton.kz',
  ogSiteName: 'MG Бетон',
  twitterCard: 'summary',
  twitterTitle: 'Бетон и керамзит — MG Бетон',
  twitterDescription: 'Цены от 15 000 ₸. Доставка бетона и керамзита в Алматы.',
})

useSchemaOrg([
  defineWebPage({
    name: 'Главная | MG Бетон',
    description: 'Продажа и доставка бетона и керамзита в Алматы. Прямые поставки от производителя.',
  }),
  defineWebSite({
    name: 'MG Бетон',
    url: 'https://mg-beton.kz',
    description: 'Производство и доставка бетона, раствора, керамзита и сопутствующих материалов по Казахстану.',
  }),
  defineLocalBusiness({
    name: 'MG Бетон',
    url: 'https://mg-beton.kz',
    image: 'https://mg-beton.kz/logo.png',
    telephone: '+77751442023',
    email: 'megabeton@mail.ru',
    description: 'Производство и доставка бетона по всему Казахстану. Бетон от 15 000 тг/м³. Услуги автобетононасоса, раствор, керамзит и другое.',
    address: {
      streetAddress: 'Улица Казыбаева, 262',
      addressLocality: 'Алматы',
      addressCountry: 'KZ',
    },
    openingHours: ['Mo-Sa 08:00-20:00'],
  }),
])
const faqs = [
  {
    question: 'Какая марка бетона подходит для фундамента?',
    answer: 'Для заливки фундамента частного дома чаще всего используют бетон М300 или бетон М350. Эти марки обеспечивают необходимую прочность, устойчивость к влаге и морозу.',
  },
  {
    question: 'В чём разница между бетоном М250 и М350?',
    answer: 'Бетон М250 — это более бюджетный вариант, используется для стяжек и полов. Бетон М350 — более прочный, применяется в строительстве колонн, плит перекрытия и монолитных конструкций.',
  },
  {
    question: 'Как выбрать нужную марку бетона?',
    answer: 'Выбор зависит от типа конструкции: для дорожек подойдёт М200–М250, для ленточного фундамента — бетон М300, для нагруженных конструкций — М350 и выше. Наши специалисты бесплатно помогут определиться.',
  },
  {
    question: 'Соответствует ли ваш бетон ГОСТу?',
    answer: 'Да, весь наш бетон производится по ГОСТ и сопровождается паспортом качества. Это гарантирует соответствие заявленной марке и характеристикам.',
  },
]

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

grades.forEach((grade) => {
  defineProduct({
    name: `Бетон марки ${grade.grade}`,
    description: `Бетон ${grade.grade} (${grade.description}) с морозостойкостью F${grade.f}`,
    offers: {
      price: grade.price,
      priceCurrency: 'KZT',
      availability: 'https://schema.org/InStock',
    },
    image: `https://mg-beton.kz${grade.image}`,
  })
})

defineQuestion({
  mainEntity: [
    {
      '@type': 'Question',
      'name': 'Какая марка бетона подходит для фундамента?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Для заливки фундамента частного дома чаще всего используют бетон М300 или бетон М350. Эти марки обеспечивают необходимую прочность, устойчивость к влаге и морозу.',
      },
    },
    {
      '@type': 'Question',
      'name': 'В чём разница между бетоном М250 и М350?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Бетон М250 — это более бюджетный вариант, используется для стяжек и полов. Бетон М350 — более прочный, применяется в строительстве колонн, плит перекрытия и монолитных конструкций.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Как выбрать нужную марку бетона?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Выбор зависит от типа конструкции: для дорожек подойдёт М200–М250, для ленточного фундамента — бетон М300, для нагруженных конструкций — М350 и выше. Наши специалисты бесплатно помогут определиться.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Соответствует ли ваш бетон ГОСТу?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Да, весь наш бетон производится по ГОСТ и сопровождается паспортом качества. Это гарантирует соответствие заявленной марке и характеристикам.',
      },
    },
  ],
})
</script>

<template>
  <!-- HERO Section -->
  <section
    id="hero"
    class="bg-[url('/background.webp')] flex min-h-screen items-center relative bg-cover bg-center"
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

  <FAQComponent :faqs="faqs" title="Часто задаваемые вопросы о марках бетона" />
  <!-- Таблица услуг -->
</template>
