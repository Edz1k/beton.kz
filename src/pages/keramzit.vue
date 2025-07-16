<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { defineQuestion } from '@vueuse/schema-org'

defineQuestion({
  mainEntity: [
    {
      '@type': 'Question',
      'name': 'Что такое керамзит и из чего он состоит?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Керамзит — это легкий пористый заполнитель, получаемый путём обжига глинистых пород. Он состоит из вспученной глины и имеет высокую тепло- и звукоизоляцию.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Где используется керамзит?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Керамзит применяется в строительстве для утепления полов, крыш, стен, а также в дренажных системах, при изготовлении лёгкого бетона и в ландшафтном дизайне.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Какие бывают фракции керамзита?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Керамзит делится на фракции: 5–10 мм, 10–20 мм, 20–40 мм. Мелкий — для стяжек и утепления, крупный — для дренажа и наполнения.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Какие преимущества у керамзита?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Он лёгкий, прочный, не горит, устойчив к гниению и перепадам температур, экологически чистый и долговечный.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Можно ли использовать керамзит для утепления?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Да, керамзит отлично подходит для утепления полов, чердаков и стен. Он сохраняет тепло, не впитывает влагу и не теряет свои свойства со временем.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Продаётся ли керамзит на кубы или мешки?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Мы продаём керамзит как в мешках по 50 л, так и насыпью в кубах. Объём подбирается под ваш проект — наши менеджеры помогут рассчитать нужное количество.',
      },
    },
  ],
})

useHead({
  title: 'Керамзит с доставкой в Алматы — MG Бетон',
  meta: [
    {
      name: 'description',
      content:
        'Керамзит фракций 5–10 и 10–20 мм. Доставка по Алматы. В мешках и россыпью. Утепление, отсыпка, строительство. Актуальные цены.',
    },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'Керамзит Алматы — доставка за 2 часа' },
    { property: 'og:description', content: 'Керамзит в мешках и россыпью. Быстрая доставка по городу.' },
    { property: 'og:image', content: 'https://mg-beton.kz/og-keramzit.png' },
    { property: 'og:url', content: 'https://mg-beton.kz/keramzit' },
  ],
  link: [{ rel: 'canonical', href: 'https://mg-beton.kz/keramzit' }],
})

const keramzitTypes = [
  {
    name: 'Керамзит глиняный 5–20 мм (за м³)',
    description: 'Лёгкий глиняный керамзит фракции 5–20 мм. Идеален для утепления полов, стяжек, дренажа. Продаётся в мешках и биг-бегах. Возможна доставка КамАЗом.',
    price: 'от 20 000',
    image: '/keramzit/keramzitCard.png',
  },
  {
    name: 'Керамзит глиняный 20–40 мм (за м³)',
    description: 'Глиняный керамзит крупной фракции 20–40 мм. Применяется для дренажа, шумоизоляции и засыпки. Доступен в мешках и биг-бегах. Доставка по городу и области.',
    price: 'от 21 000',
    image: '/keramzit/keramzitCard.png',
  },
  {
    name: 'Керамзит сланцевый 5–20 мм (за м³)',
    description: 'Сланцевый керамзит 5–20 мм — более тяжёлый и прочный. Подходит для нагруженных конструкций и промышленных объектов. Продаётся в биг-бегах. Доставка возможна.',
    price: 'от 22 000',
    image: '/keramzit/keramzitCard.png',
  },
  {
    name: 'Керамзит сланцевый 20–40 мм (за м³)',
    description: 'Крупнофракционный сланцевый керамзит для дренажей и звукоизоляции. Устойчив к нагрузкам и влаге. Фасовка — биг-беги. Доставка на КамАЗе.',
    price: 'от 23 000',
    image: '/keramzit/keramzitCard.png',
  },
]

const faqs = [
  {
    question: 'Что такое керамзит и из чего он состоит?',
    answer: 'Керамзит — это легкий пористый заполнитель, получаемый путём обжига глинистых пород. Он состоит из вспученной глины и имеет высокую тепло- и звукоизоляцию.',
  },
  {
    question: 'Где используется керамзит?',
    answer: 'Керамзит применяется в строительстве для утепления полов, крыш, стен, а также в дренажных системах, при изготовлении лёгкого бетона и в ландшафтном дизайне.',
  },
  {
    question: 'Какие бывают фракции керамзита?',
    answer: 'Керамзит делится на фракции: 5–10 мм, 10–20 мм, 20–40 мм. Мелкий — для стяжек и утепления, крупный — для дренажа и наполнения.',
  },
  {
    question: 'Какие преимущества у керамзита?',
    answer: 'Он лёгкий, прочный, не горит, устойчив к гниению и перепадам температур, экологически чистый и долговечный.',
  },
  {
    question: 'Можно ли использовать керамзит для утепления?',
    answer: 'Да, керамзит отлично подходит для утепления полов, чердаков и стен. Он сохраняет тепло, не впитывает влагу и не теряет свои свойства со временем.',
  },
  {
    question: 'Продаётся ли керамзит на кубы или мешки?',
    answer: 'Мы продаём керамзит как в мешках по 50 л, так и насыпью в кубах. Объём подбирается под ваш проект — наши менеджеры помогут рассчитать нужное количество.',
  },
]
</script>

<template>
  <section
    id="hero"
    class="bg-[url('/keramzit/bg.png')] flex min-h-screen items-center relative bg-cover bg-center"
  >
    <div class="bg-black/60 inset-0 absolute z-0" aria-hidden="true" />

    <div class="mx-auto px-4 relative z-10 container">
      <div class="text-white py-12 flex flex-col min-h-[70vh] items-start justify-center md:items-start">
        <div class="text-center w-full space-y-6 md:text-left md:w-1/2">
          <h1 class="text-4xl leading-tight font-bold md:text-6xl sm:text-5xl">
            Керамзит с доставкой в Алматы от 20 000 ₸
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

  <section>
    <KeramzitCalc />
  </section>

  <section class="py-16 bg-gray-50">
    <div class="mx-auto px-4 container">
      <h2 class="text-3xl font-bold mb-10 text-center">
        Цены на керамзит с доставкой в Алматы
      </h2>
      <p class="text-sm text-gray-500 mb-6 text-center">
        В наличии есть Глиняный и Сланцевый керамзит в мешках и биг-бегах. Быстрая доставка по Алматы. Цены актуальны на 2025 год.
      </p>
      <div class="gap-8 grid md:grid-cols-2 xl:grid-cols-3">
        <KeramzitCard
          v-for="(item, i) in keramzitTypes"
          :key="i"
          v-bind="item"
        />
      </div>
    </div>
  </section>

  <section class="scroll-mt-16">
    <CTAComponent />
  </section>

  <FAQComponent :faqs="faqs" title="Часто задаваемые вопросы о Керамзите" />
</template>
