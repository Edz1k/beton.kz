<script setup lang="ts">
import { useHead, useSeoMeta } from '@unhead/vue'
import {
  defineProduct,
  defineQuestion,
  defineWebPage,
  useSchemaOrg,
} from '@vueuse/schema-org'

defineOptions({
  name: 'KeramzitPage',
})
useHead({
  script: [
    {
      async: true,
      src: 'https://www.googletagmanager.com/gtag/js?id=AW-17169847962',
    },
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){ dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'AW-17169847962', { page_path: window.location.pathname });
      `,
      type: 'text/javascript',
    },
  ],
})
// 📌 Мета-теги и canonical
useSeoMeta({
  title: 'Керамзит с доставкой в Алматы — MG Бетон',
  description: 'Керамзит фракций 5–10 и 20–40 мм. Доставка по Алматы. В мешках и биг-бегах. Утепление, отсыпка, дренаж. Актуальные цены.',
  ogTitle: 'Керамзит Алматы — доставка за 2 часа',
  ogDescription: 'Керамзит глиняный и сланцевый. Продаётся в мешках и кубами. Доставка по Алматы и области.',
  ogUrl: 'https://mg-beton.kz/keramzit',
  twitterCard: 'summary',
  twitterTitle: 'Керамзит Алматы — MG Бетон',
  twitterDescription: 'Керамзит в мешках и россыпью с доставкой. Фракции от 5 до 40 мм.',
})

// 📌 Schema.org микроразметка
useSchemaOrg([
  defineWebPage({
    name: 'Керамзит | MG Бетон',
    description: 'Продажа и доставка керамзита (глиняного и сланцевого) в Алматы. В мешках и биг-бегах. Утепление, засыпка, дренаж.',
    url: 'https://mg-beton.kz/keramzit',
  }),
])

const keramzitTypes = [
  {
    name: 'Керамзит глиняный 5–20 мм (за м³)',
    description: 'Лёгкий глиняный керамзит фракции 5–20 мм. Идеален для утепления полов, стяжек, дренажа. Продаётся в мешках и биг-бегах. Возможна доставка КамАЗом.',
    price: 'от 20 000',
    image: '/keramzit/keramzitCard.webp',
  },
  {
    name: 'Керамзит глиняный 20–40 мм (за м³)',
    description: 'Глиняный керамзит крупной фракции 20–40 мм. Применяется для дренажа, шумоизоляции и засыпки. Доступен в мешках и биг-бегах. Доставка по городу и области.',
    price: 'от 21 000',
    image: '/keramzit/keramzitCard.webp',
  },
  {
    name: 'Керамзит сланцевый 5–20 мм (за м³)',
    description: 'Сланцевый керамзит 5–20 мм — более тяжёлый и прочный. Подходит для нагруженных конструкций и промышленных объектов. Продаётся в биг-бегах. Доставка возможна.',
    price: 'от 22 000',
    image: '/keramzit/keramzitCard.webp',
  },
  {
    name: 'Керамзит сланцевый 20–40 мм (за м³)',
    description: 'Крупнофракционный сланцевый керамзит для дренажей и звукоизоляции. Устойчив к нагрузкам и влаге. Фасовка — биг-беги. Доставка на КамАЗе.',
    price: 'от 23 000',
    image: '/keramzit/keramzitCard.webp',
  },
]

// 📌 Schema.org: Product для каждой позиции
keramzitTypes.forEach((item) => {
  defineProduct({
    name: item.name,
    description: item.description,
    image: `https://mg-beton.kz${item.image}`,
    offers: {
      price: item.price.replace(/\D/g, ''),
      priceCurrency: 'KZT',
      availability: 'https://schema.org/InStock',
    },
  })
})

// 📌 Schema.org: FAQ
defineQuestion({
  mainEntity: [
    {
      '@type': 'Question',
      'name': 'Что такое керамзит и из чего он состоит?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Керамзит — это легкий пористый заполнитель, получаемый путём обжига глины. Он имеет высокую тепло- и звукоизоляцию.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Где используется керамзит?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'В утеплении полов, стяжках, дренажах, ландшафтных работах и производстве лёгких бетонов.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Какие бывают фракции керамзита?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': '5–20 мм и 20–40 мм — мелкий для утепления, крупный для дренажа и отсыпки.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Можно ли использовать керамзит для утепления?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Да, керамзит отлично сохраняет тепло, не боится влаги и служит десятилетиями.',
      },
    },
    {
      '@type': 'Question',
      'name': 'В какой таре поставляется керамзит?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'В мешках по 50 л и насыпью в биг-бегах или кубами. Подбираем под ваш проект.',
      },
    },
  ],
})

const faqs = [
  {
    question: 'Что такое керамзит и из чего он состоит?',
    answer: 'Керамзит — это лёгкий заполнитель из вспученной глины. Отлично держит тепло и не боится влаги.',
  },
  {
    question: 'Где применяется керамзит?',
    answer: 'В строительстве, утеплении полов, в ландшафте, при изготовлении лёгкого бетона и дренажей.',
  },
  {
    question: 'Какие фракции бывают?',
    answer: 'Обычно 5–20 мм и 20–40 мм. Мелкий — для утепления и стяжек, крупный — для отсыпки и дренажа.',
  },
  {
    question: 'Как поставляется?',
    answer: 'В мешках (50 л), биг-бегах и насыпью на КамАЗе.',
  },
]
</script>

<template>
  <section
    id="hero"
    class="bg-[url('/keramzit/bg.webp')] flex min-h-screen items-center relative bg-cover bg-center"
  >
    <div class="bg-black/60 inset-0 absolute z-0" aria-hidden="true" />
    <div class="mx-auto px-4 relative z-10 container">
      <div class="text-white py-12 flex flex-col min-h-[70vh] items-start justify-center md:items-start">
        <div class="text-center w-full space-y-6 md:text-left md:w-1/2">
          <h1 class="text-4xl leading-tight font-bold md:text-6xl sm:text-5xl">
            Керамзит с доставкой в Алматы от 20 000 ₸
          </h1>
          <p class="text-base sm:text-lg">
            Глиняный и сланцевый керамзит для утепления, дренажа и отсыпки. Быстрая доставка по Алматы и области.
          </p>
          <div class="mt-6">
            <RequestModal />
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="calc" class="scroll-mt-16">
    <KeramzitCalc />
  </section>

  <section class="py-16 bg-gray-50">
    <div class="mx-auto px-4 container">
      <h2 class="text-3xl font-bold mb-10 text-center">
        Цены на керамзит с доставкой в Алматы
      </h2>
      <p class="text-sm text-gray-500 mb-6 text-center">
        В наличии глиняный и сланцевый керамзит. В мешках, биг-бегах и россыпью. Доставка на следующий день.
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

  <FAQComponent id="faqs" :faqs="faqs" title="Часто задаваемые вопросы о керамзите" />
</template>
