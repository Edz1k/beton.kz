<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'
import { defineBreadcrumb, defineProduct, defineQuestion, defineWebPage, useSchemaOrg } from '@vueuse/schema-org'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getKeramzitProductBySlug, keramzitProducts } from '~/data/keramzit-products'

defineOptions({
  name: 'KeramzitProductPage',
})

const route = useRoute('/keramzit/[slug]')

const product = computed(() => getKeramzitProductBySlug(route.params.slug))

const otherProducts = computed(() =>
  keramzitProducts.filter(item => item.slug !== product.value?.slug),
)

const pageTitle = computed(() =>
  product.value?.seo.title ?? 'Керамзит не найден | MG Бетон',
)

const pageDescription = computed(() =>
  product.value?.seo.description ?? 'Запрашиваемая страница керамзита не найдена.',
)

const canonicalUrl = computed(() =>
  product.value
    ? `https://mg-beton.kz/keramzit/${product.value.slug}`
    : 'https://mg-beton.kz/keramzit',
)

useSeoMeta({
  title: () => pageTitle.value,
  description: () => pageDescription.value,
  ogTitle: () => pageTitle.value,
  ogDescription: () => pageDescription.value,
  ogUrl: () => canonicalUrl.value,
  ogImage: () => product.value ? `https://mg-beton.kz${product.value.image}` : undefined,
  twitterCard: 'summary_large_image',
  twitterTitle: () => pageTitle.value,
  twitterDescription: () => pageDescription.value,
  twitterImage: () => product.value ? `https://mg-beton.kz${product.value.image}` : undefined,
})

if (product.value) {
  useSchemaOrg([
    defineWebPage({
      name: product.value.seo.title,
      description: product.value.seo.description,
      url: canonicalUrl.value,
    }),
    defineProduct({
      name: product.value.name,
      description: product.value.seo.shortDescription,
      image: `https://mg-beton.kz${product.value.image}`,
      offers: {
        price: product.value.price,
        priceCurrency: 'KZT',
        availability: 'https://schema.org/InStock',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'reviewCount': '96',
      },
    }),
    defineBreadcrumb({
      itemListElement: [
        {
          name: 'Главная',
          item: 'https://mg-beton.kz/',
        },
        {
          name: 'Керамзит',
          item: 'https://mg-beton.kz/keramzit',
        },
        {
          name: product.value.name,
          item: canonicalUrl.value,
        },
      ],
    }),
  ])

  defineQuestion({
    mainEntity: product.value.seo.faq.map(item => ({
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
  <section v-if="product" class="py-12 bg-white md:py-16">
    <div class="mx-auto px-4 container">
      <nav class="text-sm text-black/50 mb-6">
        <RouterLink to="/" class="transition hover:text-black">
          Главная
        </RouterLink>
        <span class="mx-2">/</span>
        <RouterLink to="/keramzit" class="transition hover:text-black">
          Керамзит
        </RouterLink>
        <span class="mx-2">/</span>
        <span class="text-black">{{ product.name }}</span>
      </nav>

      <div class="gap-10 grid items-start lg:grid-cols-2">
        <div>
          <img
            :src="product.image"
            :alt="`${product.name} в Алматы с доставкой`"
            class="rounded-3xl w-full shadow-sm object-cover"
            loading="eager"
          >
        </div>

        <div>
          <div class="text-sm text-orange-600 font-medium mb-4 px-4 py-2 rounded-full bg-orange-50 inline-flex gap-2 items-center">
            <div class="i-mdi:truck-fast h-5 w-5" />
            Доставка по Алматы и области
          </div>

          <h1 class="text-3xl leading-tight font-bold mb-4 md:text-5xl">
            {{ product.name }} в Алматы с доставкой
          </h1>

          <p class="text-base text-black/70 leading-7 mb-6 md:text-lg">
            {{ product.seo.shortDescription }}
          </p>

          <div class="mb-6 gap-4 grid sm:grid-cols-2">
            <div class="p-4 border border-black/10 rounded-2xl transition hover:shadow-sm hover:-translate-y-0.5">
              <div class="mb-3 flex gap-3 items-center">
                <div class="text-orange-600 rounded-2xl bg-orange-50 flex h-11 w-11 items-center justify-center">
                  <div class="i-mdi:grain h-6 w-6" />
                </div>
                <div class="text-sm text-black/50">
                  Тип материала
                </div>
              </div>
              <div class="text-lg font-semibold">
                {{ product.typeLabel }}
              </div>
            </div>

            <div class="p-4 border border-black/10 rounded-2xl transition hover:shadow-sm hover:-translate-y-0.5">
              <div class="mb-3 flex gap-3 items-center">
                <div class="text-blue-600 rounded-2xl bg-blue-50 flex h-11 w-11 items-center justify-center">
                  <div class="i-mdi:resize h-6 w-6" />
                </div>
                <div class="text-sm text-black/50">
                  Фракция
                </div>
              </div>
              <div class="text-lg font-semibold">
                {{ product.fraction }}
              </div>
            </div>

            <div class="p-4 border border-black/10 rounded-2xl transition hover:shadow-sm hover:-translate-y-0.5">
              <div class="mb-3 flex gap-3 items-center">
                <div class="text-cyan-700 rounded-2xl bg-cyan-50 flex h-11 w-11 items-center justify-center">
                  <div class="i-mdi:weight h-6 w-6" />
                </div>
                <div class="text-sm text-black/50">
                  Плотность
                </div>
              </div>
              <div class="text-lg font-semibold">
                {{ product.density }}
              </div>
            </div>

            <div class="p-4 border border-black/10 rounded-2xl transition hover:shadow-sm hover:-translate-y-0.5">
              <div class="mb-3 flex gap-3 items-center">
                <div class="text-green-600 rounded-2xl bg-green-50 flex h-11 w-11 items-center justify-center">
                  <div class="i-mdi:package-variant-closed h-6 w-6" />
                </div>
                <div class="text-sm text-black/50">
                  Поставка
                </div>
              </div>
              <div class="text-lg font-semibold">
                {{ product.packageOptions }}
              </div>
            </div>
          </div>

          <div class="mb-8 p-5 rounded-3xl bg-gray-50">
            <div class="flex gap-4 items-start justify-between">
              <div>
                <div class="text-sm text-black/50">
                  Цена за м³
                </div>
                <div class="text-3xl font-bold mt-1">
                  от {{ product.price.toLocaleString('ru-RU') }} ₸
                </div>
                <p class="text-sm text-black/60 leading-6 mt-2">
                  Точная стоимость зависит от объема, адреса доставки, формата поставки и условий разгрузки на объекте.
                </p>
              </div>

              <div class="text-orange-600 rounded-2xl bg-white h-14 w-14 hidden shadow-sm items-center justify-center md:flex">
                <div class="i-mdi:cash-multiple h-7 w-7" />
              </div>
            </div>
          </div>

          <div class="mb-8 gap-3 grid sm:grid-cols-2">
            <div class="p-4 border border-black/10 rounded-2xl flex gap-3 items-center">
              <div class="text-green-600 rounded-xl bg-green-50 flex h-10 w-10 items-center justify-center">
                <div class="i-mdi:check-circle-outline h-5 w-5" />
              </div>
              <div class="text-sm font-medium">
                Подбор фракции под задачу
              </div>
            </div>

            <div class="p-4 border border-black/10 rounded-2xl flex gap-3 items-center">
              <div class="text-blue-600 rounded-xl bg-blue-50 flex h-10 w-10 items-center justify-center">
                <div class="i-mdi:calculator-variant-outline h-5 w-5" />
              </div>
              <div class="text-sm font-medium">
                Расчет объема и цены
              </div>
            </div>

            <div class="p-4 border border-black/10 rounded-2xl flex gap-3 items-center">
              <div class="text-orange-600 rounded-xl bg-orange-50 flex h-10 w-10 items-center justify-center">
                <div class="i-mdi:truck-delivery-outline h-5 w-5" />
              </div>
              <div class="text-sm font-medium">
                Доставка по Алматы
              </div>
            </div>

            <div class="p-4 border border-black/10 rounded-2xl flex gap-3 items-center">
              <div class="text-black rounded-xl bg-zinc-100 flex h-10 w-10 items-center justify-center">
                <div class="i-mdi:shield-check-outline h-5 w-5" />
              </div>
              <div class="text-sm font-medium">
                Материал под вашу работу
              </div>
            </div>
          </div>

          <RequestModal />
        </div>
      </div>
    </div>
  </section>

  <FadeUp
    v-if="product"
    id="calc"
    tag="section"
    class="scroll-mt-16"
    :distance="28"
    :duration="700"
  >
    <KeramzitCalc />
  </FadeUp>

  <section v-if="product" class="py-12 md:py-16">
    <div class="mx-auto px-4 container">
      <div class="max-w-5xl">
        <h2 class="text-2xl font-bold mb-4 md:text-3xl">
          {{ product.name }} - описание и особенности
        </h2>

        <div class="text-base text-black/70 leading-8 space-y-4">
          <p
            v-for="(paragraph, index) in product.seo.fullDescription"
            :key="`full-description-${index}`"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <section v-if="product" class="py-12 md:py-16">
    <div class="mx-auto px-4 container">
      <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-4 md:text-3xl">
          Где применяется {{ product.name }}
        </h2>

        <p class="text-base text-black/70 leading-7 mb-6">
          {{ product.name }} используют в строительстве и ремонте благодаря сочетанию небольшого веса, удобной фракции и практичных эксплуатационных свойств.
        </p>

        <ul class="gap-3 grid md:grid-cols-2">
          <li
            v-for="useCase in product.seo.useCases"
            :key="useCase"
            class="p-4 border border-black/10 rounded-2xl flex gap-3 transition items-start hover:border-black/20 hover:shadow-sm"
          >
            <div class="text-orange-600 mt-0.5 rounded-xl bg-orange-50 flex shrink-0 h-10 w-10 items-center justify-center">
              <div class="i-mdi:shovel h-5 w-5" />
            </div>
            <span class="leading-6">{{ useCase }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section v-if="product" class="py-12 bg-gray-50 md:py-16">
    <div class="mx-auto px-4 container">
      <div class="max-w-5xl">
        <h2 class="text-2xl font-bold mb-4 md:text-3xl">
          Преимущества {{ product.name }}
        </h2>

        <div class="gap-4 grid md:grid-cols-2">
          <div
            v-for="advantage in product.seo.advantages"
            :key="advantage"
            class="p-5 rounded-2xl bg-white shadow-sm transition hover:-translate-y-0.5"
          >
            <div class="flex gap-3 items-start">
              <div class="text-green-600 rounded-2xl bg-green-50 flex shrink-0 h-11 w-11 items-center justify-center">
                <div class="i-mdi:star-four-points-circle-outline h-6 w-6" />
              </div>
              <div class="text-black/80 leading-6">
                {{ advantage }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section v-if="product" class="py-12 md:py-16">
    <div class="mx-auto px-4 container">
      <div class="gap-6 grid lg:grid-cols-2">
        <div class="p-6 border border-black/10 rounded-3xl md:p-8">
          <div class="text-orange-600 mb-4 rounded-2xl bg-orange-50 flex h-14 w-14 items-center justify-center">
            <div class="i-mdi:truck-fast-outline h-7 w-7" />
          </div>
          <h2 class="text-2xl font-bold mb-3">
            Доставка {{ product.name }} по Алматы
          </h2>
          <div class="text-base text-black/70 leading-7 space-y-4">
            <p
              v-for="(paragraph, index) in product.seo.deliveryText"
              :key="`delivery-text-${index}`"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>

        <div class="p-6 border border-black/10 rounded-3xl md:p-8">
          <div class="text-black mb-4 rounded-2xl bg-zinc-100 flex h-14 w-14 items-center justify-center">
            <div class="i-mdi:office-building-marker-outline h-7 w-7" />
          </div>
          <h2 class="text-2xl font-bold mb-3">
            Почему выбирают керамзит от MG Бетон
          </h2>
          <div class="text-base text-black/70 leading-7 space-y-4">
            <p
              v-for="(paragraph, index) in product.seo.whyChooseText"
              :key="`why-choose-text-${index}`"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <FAQComponent
    v-if="product"
    id="keramzit-product-faq"
    :faqs="product.seo.faq"
    :title="`Часто задаваемые вопросы: ${product.name}`"
  />

  <section v-if="product" class="py-12 md:py-16">
    <div class="mx-auto px-4 container">
      <div class="text-white px-6 py-8 rounded-3xl bg-black md:px-10 md:py-10">
        <div class="gap-8 grid lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div class="text-sm text-white/90 font-medium mb-3 px-4 py-2 rounded-full bg-white/10 inline-flex gap-2 items-center">
              <div class="i-mdi:phone-outline h-5 w-5" />
              Быстрый расчет стоимости
            </div>

            <h2 class="text-2xl font-bold md:text-3xl">
              Заказать {{ product.name }} с доставкой
            </h2>

            <p class="text-white/80 mt-3 max-w-2xl">
              Оставьте заявку, и мы рассчитаем стоимость с доставкой по Алматы, подскажем по объему,
              фракции и формату поставки под ваш объект.
            </p>
          </div>

          <div class="flex items-center justify-start lg:justify-end">
            <div class="text-white rounded-3xl bg-white/10 h-20 w-20 hidden items-center justify-center md:flex">
              <div class="i-mdi:truck-fast-outline h-10 w-10" />
            </div>
          </div>
        </div>

        <div class="mt-6">
          <RequestModal />
        </div>
      </div>
    </div>
  </section>

  <section v-if="product" class="pb-16">
    <div class="mx-auto px-4 container">
      <h2 class="text-2xl font-bold mb-6 md:text-3xl">
        Другие виды керамзита
      </h2>

      <div class="gap-6 grid md:grid-cols-2 xl:grid-cols-3">
        <RouterLink
          v-for="item in otherProducts"
          :key="item.slug"
          :to="item.to"
          class="group p-5 border border-black/10 rounded-2xl transition hover:border-black/30 hover:shadow-md hover:-translate-y-1"
        >
          <div class="flex gap-3 items-start justify-between">
            <div>
              <div class="text-xl font-semibold">
                {{ item.name }}
              </div>
              <div class="text-sm text-black/60 mt-2">
                {{ item.typeLabel }} · {{ item.fraction }} · от {{ item.price.toLocaleString('ru-RU') }} ₸
              </div>
            </div>

            <div class="text-black rounded-2xl bg-gray-100 flex h-11 w-11 transition items-center justify-center group-hover:text-orange-600 group-hover:bg-orange-50">
              <div class="i-mdi:arrow-top-right h-5 w-5" />
            </div>
          </div>

          <div class="text-sm text-black font-medium mt-4 transition group-hover:translate-x-1">
            Перейти →
          </div>
        </RouterLink>
      </div>

      <div class="mt-8">
        <RouterLink
          to="/keramzit"
          class="text-sm font-medium px-5 py-3 border border-black/10 rounded-xl inline-flex transition items-center hover:border-black/30 hover:bg-gray-50"
        >
          Вернуться к керамзиту
        </RouterLink>
      </div>
    </div>
  </section>

  <section v-else class="py-20">
    <div class="mx-auto px-4 text-center max-w-3xl">
      <h1 class="text-3xl font-bold">
        Керамзит не найден
      </h1>
      <p class="text-black/60 mt-4">
        Возможно, ссылка устарела или такой страницы пока нет.
      </p>
      <div class="mt-6">
        <RouterLink
          to="/keramzit"
          class="text-sm font-medium px-5 py-3 border border-black/10 rounded-xl inline-flex transition items-center hover:border-black/30 hover:bg-gray-50"
        >
          К разделу керамзита
        </RouterLink>
      </div>
    </div>
  </section>
</template>
