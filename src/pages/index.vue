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
  title: 'Купить бетон в Алматы с доставкой — MG Бетон',
  description: 'Купить бетон в Алматы с доставкой от 15 000 ₸. Бетон всех марок по ГОСТ, быстрый расчет цены, доставка на объект.',
  ogTitle: 'Купить бетон в Алматы — MG Бетон',
  ogDescription: 'Бетон с доставкой по Алматы. Марки М150–М400, паспорт качества, быстрый выезд.',
  ogUrl: 'https://mg-beton.kz',
  ogSiteName: 'MG Бетон',
  twitterCard: 'summary',
  twitterTitle: 'Купить бетон в Алматы — MG Бетон',
  twitterDescription: 'Бетон с доставкой по Алматы от 15 000 ₸. Все марки по ГОСТ.',
})

useSchemaOrg([
  defineWebPage({
    name: 'Купить бетон в Алматы | MG Бетон',
    description: 'Купить бетон в Алматы с доставкой. Продажа бетона всех марок по ГОСТ напрямую от производителя.',
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
    description: 'Производство и доставка бетона по Алматы и Казахстану. Бетон от 15 000 тг/м³. Услуги автобетононасоса, раствор, керамзит и другое.',
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

concreteGrades.forEach((grade) => {
  defineProduct({
    name: `Бетон марки ${grade.grade}`,
    description: `Бетон ${grade.grade} (${grade.strengthClass}) с морозостойкостью ${grade.frostResistance}`,
    offers: {
      price: grade.price,
      priceCurrency: 'KZT',
      availability: 'https://schema.org/InStock',
    },
    image: `https://mg-beton.kz${grade.image}`,
  })
})

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
  <!-- HERO -->
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
              :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            >
              <p class="text-sm px-4 py-2 border border-white/20 rounded-full bg-white/10 inline-flex items-center backdrop-blur-sm">
                Производство и доставка бетона по Алматы
              </p>
            </div>

            <h1
              class="text-4xl leading-tight font-bold transition-all duration-700 delay-100 ease-out md:text-6xl sm:text-5xl"
              :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            >
              Купить бетон в Алматы с доставкой от 15 000 ₸
            </h1>

            <p
              class="text-base text-white/85 max-w-2xl transition-all duration-700 delay-200 ease-out sm:text-lg"
              :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            >
              Компания «MG Бетон» предлагает доставку и производство бетона, керамзита и растворов с гарантией качества по всей стране.
            </p>

            <div
              class="transition-all duration-700 delay-300 ease-out"
              :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            >
              <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div class="w-fit">
                  <RequestModal />
                </div>

                <a
                  href="#calc"
                  class="text-white font-medium px-6 py-3 border border-white/20 rounded-xl bg-white/10 inline-flex transition-all duration-300 items-center justify-center backdrop-blur-sm hover:bg-white/15 hover:-translate-y-0.5"
                >
                  Рассчитать стоимость
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- КАЛЬКУЛЯТОР -->
  <FadeUp
    id="calc"
    tag="section"
    class="scroll-mt-16"
    :distance="28"
    :duration="700"
  >
    <CalcTabs />
  </FadeUp>

  <!-- МАРКИ БЕТОНА -->
  <section class="py-16 bg-gray-50">
    <div class="mx-auto px-4 container">
      <FadeUp :distance="20" :duration="600">
        <h2 class="text-3xl font-bold mb-4 text-center">
          Цены на бетон с доставкой в Алматы
        </h2>
      </FadeUp>

      <FadeUp :distance="20" :duration="600" :delay="100">
        <p class="text-sm text-gray-500 mx-auto mb-10 text-center max-w-2xl">
          Все марки соответствуют ГОСТ. Цена указана без доставки. Позвоните — рассчитаем итоговую стоимость с учетом объема и объекта.
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
              :price="String(grade.price)"
              :f="grade.frostResistance.replace('F', '')"
              :image="grade.image"
              :to="`/beton/${grade.slug}`"
            />
          </div>
        </FadeUp>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <FadeUp
    tag="section"
    class="scroll-mt-16"
    :distance="28"
    :duration="700"
  >
    <CTAComponent />
  </FadeUp>

  <!-- FAQ -->
  <FadeUp
    :distance="24"
    :duration="700"
  >
    <FAQComponent
      id="faqs"
      :faqs="faqs"
      title="Часто задаваемые вопросы о марках бетона"
    />
  </FadeUp>
</template>
