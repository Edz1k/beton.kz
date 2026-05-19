<script setup lang="ts">
import { useHead, useSeoMeta } from '@unhead/vue'
import {
  defineProduct,
  defineQuestion,
  defineWebPage,
  defineWebSite,
  useSchemaOrg,
} from '@vueuse/schema-org'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { keramzitProducts } from '~/data/keramzit-products'

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
        window.gtag = function(){ dataLayer.push(arguments); };

        gtag('js', new Date());
        gtag('config', 'AW-17169847962', { page_path: window.location.pathname });
      `,
      type: 'text/javascript',
    },
  ],
})

useSeoMeta({
  title: 'Купить керамзит в Алматы с доставкой — цена за м³ | MG Бетон',
  description: 'Купить керамзит в Алматы с доставкой по городу и области. Глиняный и сланцевый керамзит 5–20 и 20–40 мм, в мешках, биг-бегах и россыпью. Цена за м³, быстрый расчет стоимости.',
  ogTitle: 'Купить керамзит в Алматы с доставкой — MG Бетон',
  ogDescription: 'Керамзит в Алматы с доставкой: глиняный и сланцевый, фракции 5–20 и 20–40 мм. В мешках, биг-бегах и россыпью.',
  ogUrl: 'https://mg-beton.kz/keramzit',
  ogSiteName: 'MG Бетон',
  twitterCard: 'summary',
  twitterTitle: 'Керамзит в Алматы — MG Бетон',
  twitterDescription: 'Продажа керамзита с доставкой по Алматы. Для утепления, дренажа, отсыпки и легких бетонных смесей.',
})

const faqs = [
  {
    question: 'Что такое керамзит?',
    answer: 'Керамзит — это лёгкий пористый материал, который получают путём обжига глины. Он применяется для утепления, дренажа, засыпки и в производстве лёгких бетонных смесей.',
  },
  {
    question: 'Какие фракции керамзита бывают?',
    answer: 'Чаще всего используют фракции 5–20 мм и 20–40 мм. Мелкая фракция подходит для утепления и стяжки, крупная — для дренажа, отсыпки и засыпки.',
  },
  {
    question: 'Где используется керамзит?',
    answer: 'Керамзит применяют для утепления полов, устройства лёгких стяжек, дренажа, ландшафтных работ, засыпки пустот и производства керамзитобетона.',
  },
  {
    question: 'От чего зависит цена керамзита в Алматы?',
    answer: 'Цена зависит от фракции, объёма заказа, типа фасовки, адреса доставки и условий подъезда техники к объекту.',
  },
]

useSchemaOrg([
  defineWebPage({
    name: 'Купить керамзит в Алматы | MG Бетон',
    description: 'Керамзит в Алматы с доставкой на объект. Глиняный и сланцевый керамзит, разные фракции, расчет стоимости и подбор материала под задачу.',
    url: 'https://mg-beton.kz/keramzit',
  }),
  defineWebSite({
    name: 'MG Бетон',
    url: 'https://mg-beton.kz',
    description: 'Производство и доставка бетона, раствора, керамзита и сопутствующих материалов по Алматы.',
  }),
])

keramzitProducts.forEach((item) => {
  defineProduct({
    name: item.name,
    description: item.seo.shortDescription,
    image: `https://mg-beton.kz${item.image}`,
    url: `https://mg-beton.kz${item.to}`,
    offers: {
      price: item.price,
      priceCurrency: 'KZT',
      availability: 'https://schema.org/InStock',
    },
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
  <section
    id="hero"
    class="bg-neutral-950 flex min-h-screen items-center relative overflow-hidden"
  >
    <div
      class="scale-105 inset-0 absolute bg-cover bg-center"
      :style="{
        ...heroBgStyle,
        backgroundImage: `url('/keramzit/bg.webp')`,
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
                Керамзит с доставкой по Алматы
              </p>
            </div>

            <h1
              class="text-4xl leading-tight font-bold transition-all duration-700 delay-100 ease-out md:text-6xl sm:text-5xl"
              :class="heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
            >
              Купить керамзит в Алматы с доставкой — цена от 20 000 ₸ за м³
            </h1>

            <p
              class="text-base text-white/85 max-w-2xl transition-all duration-700 delay-200 ease-out sm:text-lg"
              :class="heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
            >
              Глиняный и сланцевый керамзит для утепления полов, дренажа, отсыпки, стяжек и лёгких бетонных смесей. Быстрый расчет стоимости и доставка по Алматы и области.
            </p>

            <div
              class="transition-all duration-700 delay-300 ease-out"
              :class="heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
            >
              <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div>
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
                Подбор фракции под задачу
              </div>
              <div class="flex gap-2 items-center">
                <div class="i-mdi:truck-fast-outline text-orange-400 h-5 w-5" />
                Доставка на объект
              </div>
              <div class="flex gap-2 items-center">
                <div class="i-mdi:home-thermometer-outline text-blue-400 h-5 w-5" />
                Для утепления и стяжки
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
    <KeramzitCalc />
  </FadeUp>

  <section class="py-16 bg-gray-50">
    <div class="mx-auto px-4 container">
      <FadeUp :distance="20" :duration="600">
        <h2 class="text-3xl font-bold mb-4 text-center">
          Цены на керамзит с доставкой в Алматы
        </h2>
      </FadeUp>

      <FadeUp :distance="20" :duration="600" :delay="100">
        <p class="text-sm text-gray-500 mx-auto mb-10 text-center max-w-2xl">
          В наличии глиняный и сланцевый керамзит разных фракций. Материал подходит для утепления, дренажа, отсыпки, легких стяжек и других строительных задач.
        </p>
      </FadeUp>

      <div class="gap-8 grid md:grid-cols-2 xl:grid-cols-3">
        <FadeUp
          v-for="(item, index) in keramzitProducts"
          :key="item.slug"
          :delay="index * 70"
          :distance="24"
          :duration="650"
        >
          <div class="rounded-2xl h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <KeramzitCard v-bind="item" />
          </div>
        </FadeUp>
      </div>
    </div>
  </section>

  <section class="py-16">
    <div class="mx-auto px-4 max-w-5xl container">
      <h2 class="text-2xl font-bold mb-6 md:text-3xl">
        Керамзит в Алматы с доставкой — цена, виды и применение
      </h2>

      <div class="text-base text-black/70 leading-7 space-y-4">
        <p>
          Купить керамзит в Алматы с доставкой — это удобное решение для частного строительства, ремонта, утепления полов, устройства лёгких стяжек, дренажа и различных видов засыпки. Этот материал ценят за его небольшой вес, хорошие теплоизоляционные свойства, устойчивость к влаге и долговечность.
        </p>

        <p>
          Цена керамзита в Алматы зависит от фракции, типа материала, объема заказа, варианта фасовки и адреса доставки. Для одних задач подходит мелкая фракция, которую часто используют для утепления пола и стяжки, а для других нужна более крупная, если речь идет о дренаже, отсыпке или заполнении пустот.
        </p>

        <p>
          На странице собраны популярные виды керамзита, которые чаще всего заказывают для частных домов, коммерческих объектов и строительных площадок. Это позволяет быстро сравнить варианты, посмотреть ориентировочную стоимость и подобрать материал под конкретную задачу без лишней переплаты.
        </p>

        <p>
          Если вам нужен керамзит для утепления, дренажа или строительных работ, важно учитывать не только цену за м³, но и назначение материала. Правильно выбранная фракция помогает добиться нужного результата по теплоизоляции, прочности и расходу материала на объекте.
        </p>

        <p>
          MG Бетон предлагает доставку керамзита по Алматы и области, а также помогает подобрать подходящий вариант под ваш проект. Это особенно удобно, когда нужно быстро закрыть вопрос с поставкой материала и не тратить время на поиск нескольких поставщиков.
        </p>
      </div>
    </div>
  </section>

  <section class="py-16 bg-gray-50">
    <div class="mx-auto px-4 max-w-5xl container">
      <h2 class="text-2xl font-bold mb-6 md:text-3xl">
        Где используется керамзит
      </h2>

      <div class="text-base text-black/70 leading-7 mb-8 space-y-4">
        <p>
          Керамзит применяется в самых разных строительных задачах — от утепления и стяжки до дренажных систем и благоустройства территории. Ниже собраны основные направления, где этот материал используется чаще всего.
        </p>
      </div>

      <div class="gap-4 grid md:grid-cols-2">
        <div class="group p-5 border border-black/10 rounded-2xl bg-white transition hover:border-black/20 hover:shadow-sm hover:-translate-y-0.5">
          <div class="flex gap-3 items-start justify-between">
            <div>
              <div class="text-lg text-black font-semibold">
                Для утепления полов
              </div>
              <p class="text-sm text-black/65 leading-6 mt-2">
                Керамзит часто используют как утепляющий слой под стяжку в квартирах, домах и коммерческих помещениях.
              </p>
            </div>
            <div class="text-orange-600 rounded-2xl bg-orange-50 flex shrink-0 h-11 w-11 items-center justify-center">
              <div class="i-mdi:home-floor-1 h-5 w-5" />
            </div>
          </div>
        </div>

        <div class="group p-5 border border-black/10 rounded-2xl bg-white transition hover:border-black/20 hover:shadow-sm hover:-translate-y-0.5">
          <div class="flex gap-3 items-start justify-between">
            <div>
              <div class="text-lg text-black font-semibold">
                Для дренажа
              </div>
              <p class="text-sm text-black/65 leading-6 mt-2">
                Крупная фракция подходит для отвода воды, устройства дренажных слоев и защиты конструкций от переувлажнения.
              </p>
            </div>
            <div class="text-blue-600 rounded-2xl bg-blue-50 flex shrink-0 h-11 w-11 items-center justify-center">
              <div class="i-mdi:water-outline h-5 w-5" />
            </div>
          </div>
        </div>

        <div class="group p-5 border border-black/10 rounded-2xl bg-white transition hover:border-black/20 hover:shadow-sm hover:-translate-y-0.5">
          <div class="flex gap-3 items-start justify-between">
            <div>
              <div class="text-lg text-black font-semibold">
                Для лёгких стяжек
              </div>
              <p class="text-sm text-black/65 leading-6 mt-2">
                Материал уменьшает нагрузку на перекрытия и помогает сделать стяжку легче по сравнению с традиционными вариантами.
              </p>
            </div>
            <div class="text-green-600 rounded-2xl bg-green-50 flex shrink-0 h-11 w-11 items-center justify-center">
              <div class="i-mdi:layers-outline h-5 w-5" />
            </div>
          </div>
        </div>

        <div class="group p-5 border border-black/10 rounded-2xl bg-white transition hover:border-black/20 hover:shadow-sm hover:-translate-y-0.5">
          <div class="flex gap-3 items-start justify-between">
            <div>
              <div class="text-lg text-black font-semibold">
                Для отсыпки и засыпки
              </div>
              <p class="text-sm text-black/65 leading-6 mt-2">
                Керамзит используют для заполнения пустот, выравнивания оснований и решения разных строительных задач на объекте.
              </p>
            </div>
            <div class="text-zinc-700 rounded-2xl bg-zinc-100 flex shrink-0 h-11 w-11 items-center justify-center">
              <div class="i-mdi:shovel h-5 w-5" />
            </div>
          </div>
        </div>
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
            Цена керамзита в Алматы
          </h2>
          <div class="text-base text-black/70 leading-7 space-y-4">
            <p>
              Стоимость керамзита зависит от фракции, объёма заказа, формата поставки и расстояния до объекта. При расчёте важно учитывать не только базовую цену за м³, но и логистику, подъезд техники и нужный способ выгрузки материала.
            </p>
            <p>
              Для небольших объёмов и частных работ удобны одни форматы поставки, а для крупных строительных объектов — другие. Поэтому точную стоимость лучше рассчитывать под конкретную задачу.
            </p>
          </div>
        </div>

        <div class="p-6 border border-black/10 rounded-3xl md:p-8">
          <div class="text-black mb-4 rounded-2xl bg-zinc-100 flex h-14 w-14 items-center justify-center">
            <div class="i-mdi:truck-fast-outline h-7 w-7" />
          </div>
          <h2 class="text-2xl font-bold mb-3">
            Доставка керамзита на объект
          </h2>
          <div class="text-base text-black/70 leading-7 space-y-4">
            <p>
              Доставка керамзита в Алматы должна быть удобной и своевременной, особенно если материал нужен для текущего этапа работ без задержек. Поэтому важно заранее уточнить объем, адрес, формат поставки и условия подъезда.
            </p>
            <p>
              Чем точнее исходные данные по заказу, тем проще рассчитать цену и организовать подачу материала без простоев. Это особенно важно при утеплении полов, дренажных работах и засыпке больших объемов.
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
      title="Часто задаваемые вопросы о керамзите"
    />
  </FadeUp>
</template>
