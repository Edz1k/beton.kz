<script setup lang="ts">
import { useHead, useSeoMeta } from '@unhead/vue'
import {
  defineLocalBusiness,
  defineProduct,
  defineQuestion,
  defineWebPage,
  defineWebSite,
  useSchemaOrg,
} from '@vueuse/schema-org'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { concreteGrades } from '~/data/concrete-grades'

defineOptions({
  name: 'IndexPage',
})

useHead({
  script: [
    {
      async: true,
      src: 'https://www.googletagmanager.com/gtag/js?id=G-EK35CW4WFV',
    },
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        window.gtag = function(){ dataLayer.push(arguments); };

        gtag('js', new Date());
        gtag('config', 'G-EK35CW4WFV', { page_path: window.location.pathname });
        gtag('config', 'AW-17169847962');
      `,
      type: 'text/javascript',
    },
  ],
})

useSeoMeta({
  title: 'Купить бетон в Алматы с доставкой — цена за куб | MG Бетон',
  description: 'Купить бетон в Алматы с доставкой от 15 000 ₸ за м³. Марки М150–М400, быстрый расчет стоимости, подбор марки под фундамент, плиту, стяжку и другие задачи.',
  ogTitle: 'Купить бетон в Алматы с доставкой — MG Бетон',
  ogDescription: 'Бетон с доставкой по Алматы. Марки М150–М400, цена за куб, быстрый расчет, подбор смеси под ваш объект.',
  ogUrl: 'https://mg-beton.kz',
  ogSiteName: 'MG Бетон',
  twitterCard: 'summary',
  twitterTitle: 'Купить бетон в Алматы — MG Бетон',
  twitterDescription: 'Бетон с доставкой по Алматы от 15 000 ₸. Все популярные марки бетона.',
})

const faqs = [
  {
    question: 'Какая марка бетона подходит для фундамента?',
    answer: 'Для заливки фундамента частного дома чаще всего используют бетон М300 или М350. Выбор зависит от типа основания, нагрузки и условий эксплуатации.',
  },
  {
    question: 'Как выбрать нужную марку бетона?',
    answer: 'Марка бетона подбирается по типу конструкции. Для подготовительных работ чаще используют М150, для дорожек и отмостки — М200 или М250, для фундамента — М300, для более нагруженных конструкций — М350 и выше.',
  },
  {
    question: 'От чего зависит цена бетона в Алматы?',
    answer: 'Цена зависит от марки бетона, объема заказа, района доставки, условий подъезда к объекту и дополнительных услуг при подаче смеси.',
  },
  {
    question: 'Соответствует ли бетон заявленной марке?',
    answer: 'Да, бетон производится по установленным требованиям и сопровождается паспортом качества, что подтверждает соответствие характеристик заявленной марке.',
  },
]

useSchemaOrg([
  defineWebPage({
    name: 'Купить бетон в Алматы | MG Бетон',
    description: 'Бетон в Алматы с доставкой на объект. Все популярные марки бетона, расчет цены за куб, подбор смеси под строительные задачи.',
  }),
  defineWebSite({
    name: 'MG Бетон',
    url: 'https://mg-beton.kz',
    description: 'Производство и доставка бетона, раствора, керамзита и сопутствующих материалов по Алматы.',
  }),
  defineLocalBusiness({
    name: 'MG Бетон',
    url: 'https://mg-beton.kz',
    image: 'https://mg-beton.kz/logo.png',
    telephone: '+77751442023',
    email: 'megabeton@mail.ru',
    description: 'Производство и доставка бетона по Алматы. Марки бетона от М150 до М400, расчет стоимости, подбор смеси под объект.',
    address: {
      streetAddress: 'Улица Казыбаева, 262',
      addressLocality: 'Алматы',
      addressCountry: 'KZ',
    },
    openingHours: ['Mo-Sa 08:00-20:00'],
    aggregateRating: {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '127',
      'bestRating': '5',
      'worstRating': '1',
    },
  }),
])

for (const grade of concreteGrades) {
  defineProduct({
    name: `Бетон ${grade.grade}`,
    description: `Бетон ${grade.grade} (${grade.strengthClass}), морозостойкость ${grade.frostResistance}, водонепроницаемость ${grade.waterResistance}`,
    image: `https://mg-beton.kz${grade.image}`,
    offers: {
      price: grade.price,
      priceCurrency: 'KZT',
      availability: 'https://schema.org/InStock',
    },
  })
}

defineQuestion({
  mainEntity: faqs.map(item => ({
    '@type': 'Question',
    'name': item.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': item.answer,
    },
  })),
})

const heroVisible = ref(false)
const scrollY = ref(0)

function handleScroll() {
  scrollY.value = window.scrollY
}

const heroBgStyle = computed(() => {
  const y = scrollY.value * -0.08

  return {
    transform: `translate3d(0, ${y}px, 0) scale(1.05)`,
  }
})

const gradeLinks = computed(() => [
  {
    title: 'Бетон М150',
    to: '/beton/m150',
    text: 'Для подготовительных работ, подбетонки и оснований.',
  },
  {
    title: 'Бетон М200',
    to: '/beton/m200',
    text: 'Для дорожек, отмостки, площадок и лестниц.',
  },
  {
    title: 'Бетон М250',
    to: '/beton/m250',
    text: 'Для полов, площадок, ступеней и некоторых типов фундаментов.',
  },
  {
    title: 'Бетон М300',
    to: '/beton/m300',
    text: 'Одна из самых популярных марок для фундамента частного дома.',
  },
  {
    title: 'Бетон М350',
    to: '/beton/m350',
    text: 'Для нагруженных конструкций, плит и монолитных элементов.',
  },
  {
    title: 'Бетон М400',
    to: '/beton/m400',
    text: 'Для сложных и ответственных строительных задач.',
  },
])

onMounted(() => {
  requestAnimationFrame(() => {
    heroVisible.value = true
  })

  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <section
    id="hero"
    class="bg-neutral-950 flex min-h-screen items-center relative overflow-hidden"
  >
    <div
      class="scale-105 inset-0 absolute bg-cover bg-center"
      :style="{
        ...heroBgStyle,
        backgroundImage: `url('/background.webp')`,
      }"
      aria-hidden="true"
    />

    <div
      class="bg-black/60 inset-0 absolute"
      aria-hidden="true"
    />

    <div class="mx-auto px-4 relative z-10 container">
      <div class="py-12 flex min-h-[70vh] items-center">
        <div class="text-white w-full md:w-1/2">
          <div class="space-y-6">
            <div
              class="transition-all duration-700 ease-out"
              :class="heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
            >
              <p class="text-sm px-4 py-2 border border-white/20 rounded-full bg-white/10 inline-flex items-center backdrop-blur-sm">
                Бетон с доставкой по Алматы
              </p>
            </div>

            <h1
              class="text-4xl leading-tight font-bold transition-all duration-700 delay-100 ease-out md:text-6xl sm:text-5xl"
              :class="heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
            >
              Купить бетон в Алматы с доставкой от 15 000 ₸ за м³
            </h1>

            <p
              class="text-base text-white/85 max-w-2xl transition-all duration-700 delay-200 ease-out sm:text-lg"
              :class="heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
            >
              MG Бетон предлагает популярные марки бетона от М150 до М400 с расчетом стоимости, подбором смеси под объект и доставкой по Алматы и области.
            </p>

            <div
              class="transition-all duration-700 delay-300 ease-out"
              :class="heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
            >
              <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div class="">
                  <RequestModal />
                </div>

                <a
                  href="tel:+77751442023"
                  class="text-white font-medium px-6 py-3 border border-white/20 rounded-xl bg-white/10 inline-flex transition-all duration-300 items-center justify-center backdrop-blur-sm hover:bg-white/15 hover:-translate-y-0.5"
                >
                  Рассчитать стоимость
                </a>
              </div>
            </div>

            <div
              class="text-sm text-white/85 pt-2 gap-3 grid sm:grid-cols-2"
              :class="heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
            >
              <div class="flex gap-2 items-center">
                <div class="i-mdi:check-circle-outline text-green-400 h-5 w-5" />
                Подбор марки под задачу
              </div>
              <div class="flex gap-2 items-center">
                <div class="i-mdi:truck-fast-outline text-orange-400 h-5 w-5" />
                Доставка на объект
              </div>
              <div class="flex gap-2 items-center">
                <div class="i-mdi:file-document-check-outline text-blue-400 h-5 w-5" />
                Паспорт качества
              </div>
              <div class="flex gap-2 items-center">
                <div class="i-mdi:cash-fast text-yellow-300 h-5 w-5" />
                Быстрый расчет цены
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <FadeUp
    id="calc"
    tag="section"
    class="scroll-mt-16"
    :distance="28"
    :duration="700"
  >
    <CalcTabs />
  </FadeUp>

  <section class="py-16 bg-gray-50">
    <div class="mx-auto px-4 container">
      <FadeUp :distance="20" :duration="600">
        <h2 class="text-3xl font-bold mb-4 text-center">
          Цены на бетон с доставкой в Алматы
        </h2>
      </FadeUp>

      <FadeUp :distance="20" :duration="600" :delay="100">
        <p class="text-sm text-gray-500 mx-auto mb-10 text-center max-w-2xl">
          Все марки бетона имеют свои характеристики и сферу применения. Выберите подходящую марку или перейдите на отдельную страницу, чтобы посмотреть подробное описание, преимущества и область использования.
        </p>
      </FadeUp>

      <div class="gap-8 grid md:grid-cols-2 xl:grid-cols-3">
        <FadeUp
          v-for="(grade, index) in concreteGrades"
          :key="grade.slug"
          :delay="index * 70"
          :distance="24"
          :duration="650"
        >
          <div class="rounded-2xl h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <ConcreteGradeCard
              :grade="grade.grade"
              :description="grade.strengthClass"
              :price="grade.price"
              :f="grade.frostResistance.replace('F', '')"
              :image="grade.image"
              :to="`/beton/${grade.slug}`"
            />
          </div>
        </FadeUp>
      </div>
    </div>
  </section>

  <section class="py-16">
    <div class="mx-auto px-4 max-w-5xl container">
      <h2 class="text-2xl font-bold mb-6 md:text-3xl">
        Бетон в Алматы с доставкой — цены и выбор марки
      </h2>

      <div class="text-base text-black/70 leading-7 space-y-4">
        <p>
          Купить бетон в Алматы с доставкой — это удобное решение для частного и коммерческого строительства, когда важны стабильное качество смеси, своевременная подача на объект и понятная цена за куб. На главной странице собраны популярные марки бетона, которые чаще всего используют для фундаментов, стяжек, дорожек, площадок, плит и других строительных работ.
        </p>

        <p>
          Цена бетона в Алматы зависит от выбранной марки, объема заказа, района доставки, условий подъезда для техники и особенностей подачи смеси на объект. Поэтому при расчете важно учитывать не только стоимость за м³, но и все сопутствующие условия, которые влияют на итоговую цену.
        </p>

        <p>
          Для разных задач подходят разные марки. Например, бетон М150 чаще используют для подготовительных работ, бетон М200 и М250 — для дорожек, площадок, лестниц и оснований, а бетон М300 считается одной из самых востребованных марок для фундамента частного дома. Более прочные смеси, такие как М350 и М400, применяются там, где конструкция испытывает повышенную нагрузку.
        </p>

        <p>
          Если вы не уверены, какую марку выбрать, важно ориентироваться на назначение конструкции, условия эксплуатации и требуемую прочность. Именно поэтому удобнее не пытаться подобрать бетон только по цене, а сразу смотреть характеристики и сферу применения каждой марки отдельно.
        </p>

        <p>
          На сайте MG Бетон можно не только быстро посмотреть стоимость популярных марок, но и перейти на отдельные страницы с подробным описанием бетона М150, М200, М250, М300, М350 и М400. Это помогает сравнить варианты и выбрать смесь, которая действительно подходит под ваш объект без лишней переплаты.
        </p>
      </div>
    </div>
  </section>

  <section class="py-16 bg-gray-50">
    <div class="mx-auto px-4 max-w-5xl container">
      <h2 class="text-2xl font-bold mb-6 md:text-3xl">
        Как выбрать марку бетона
      </h2>

      <div class="text-base text-black/70 leading-7 mb-8 space-y-4">
        <p>
          Выбор марки бетона зависит от типа работ, расчетной нагрузки и требований к надежности конструкции. Для того чтобы не переплачивать за избыточную прочность и при этом не ошибиться с характеристиками смеси, лучше сразу понимать, для каких задач подходит каждая марка.
        </p>

        <p>
          Ниже собраны основные варианты, которые чаще всего выбирают в Алматы для частного строительства, благоустройства территории и монолитных работ.
        </p>
      </div>

      <div class="gap-4 grid md:grid-cols-2">
        <RouterLink
          v-for="item in gradeLinks"
          :key="item.to"
          :to="item.to"
          class="group p-5 border border-black/10 rounded-2xl bg-white transition hover:border-black/20 hover:shadow-sm hover:-translate-y-0.5"
        >
          <div class="flex gap-3 items-start justify-between">
            <div>
              <div class="text-lg text-black font-semibold">
                {{ item.title }}
              </div>
              <p class="text-sm text-black/65 leading-6 mt-2">
                {{ item.text }}
              </p>
            </div>

            <div class="text-black rounded-2xl bg-gray-100 flex shrink-0 h-11 w-11 transition items-center justify-center group-hover:text-orange-600 group-hover:bg-orange-50">
              <div class="i-mdi:arrow-top-right h-5 w-5" />
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>

  <section class="py-16">
    <div class="mx-auto px-4 max-w-5xl container">
      <div class="gap-6 grid lg:grid-cols-2">
        <div class="p-6 border border-black/10 rounded-3xl md:p-8">
          <div class="text-orange-600 mb-4 rounded-2xl bg-orange-50 flex h-14 w-14 items-center justify-center">
            <div class="i-mdi:cash-multiple h-7 w-7" />
          </div>
          <h2 class="text-2xl font-bold mb-3">
            Цена бетона в Алматы
          </h2>
          <div class="text-base text-black/70 leading-7 space-y-4">
            <p>
              Стоимость бетона зависит не только от марки, но и от общего объема заказа, расстояния до объекта, графика подачи и условий работы на площадке. Именно поэтому точный расчет лучше делать с учетом всех вводных, а не ориентироваться только на базовую цену за куб.
            </p>
            <p>
              Для небольших и подготовительных работ часто выбирают более доступные марки, а для фундамента и нагруженных конструкций — более прочные варианты. Такой подход помогает сохранить баланс между надежностью объекта и разумным бюджетом строительства.
            </p>
          </div>
        </div>

        <div class="p-6 border border-black/10 rounded-3xl md:p-8">
          <div class="text-black mb-4 rounded-2xl bg-zinc-100 flex h-14 w-14 items-center justify-center">
            <div class="i-mdi:truck-fast-outline h-7 w-7" />
          </div>
          <h2 class="text-2xl font-bold mb-3">
            Доставка бетона на объект
          </h2>
          <div class="text-base text-black/70 leading-7 space-y-4">
            <p>
              Доставка бетона в Алматы должна быть организована так, чтобы смесь прибыла на объект вовремя и в нужном объеме. Это особенно важно при заливке фундамента, плит, лестниц и других конструкций, где задержка может повлиять на весь ход работ.
            </p>
            <p>
              Перед заказом важно заранее уточнить адрес объекта, объем смеси, удобство подъезда для миксера и желаемое время подачи. Чем точнее подготовлены данные, тем проще рассчитать итоговую стоимость и провести заливку без простоев.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <FadeUp
    tag="section"
    class="scroll-mt-16"
    :distance="28"
    :duration="700"
  >
    <CTAComponent />
  </FadeUp>

  <FadeUp
    :distance="24"
    :duration="700"
  >
    <FAQComponent
      id="faqs"
      :faqs="faqs"
      title="Часто задаваемые вопросы о бетоне"
    />
  </FadeUp>
</template>
