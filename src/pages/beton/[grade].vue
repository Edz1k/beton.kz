<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'
import { defineBreadcrumb, defineProduct, defineQuestion, defineWebPage, useSchemaOrg } from '@vueuse/schema-org'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { concreteGrades, getConcreteGradeBySlug } from '~/data/concrete-grades'

defineOptions({
  name: 'ConcreteGradePage',
})

const route = useRoute('/beton/[grade]')

const gradeData = computed(() => {
  const params = route.params

  if (!('grade' in params))
    return null

  return getConcreteGradeBySlug(params.grade)
})

const otherGrades = computed(() =>
  concreteGrades.filter(item => item.slug !== gradeData.value?.slug),
)

const pageTitle = computed(() =>
  gradeData.value?.seo.title ?? 'Марка бетона не найдена | MG Бетон',
)

const pageDescription = computed(() =>
  gradeData.value?.seo.description ?? 'Запрашиваемая страница марки бетона не найдена.',
)

useSeoMeta({
  title: () => pageTitle.value,
  description: () => pageDescription.value,
  ogTitle: () => pageTitle.value,
  ogDescription: () => pageDescription.value,
  twitterCard: 'summary',
  twitterTitle: () => pageTitle.value,
  twitterDescription: () => pageDescription.value,
  ogUrl: () => gradeData.value
    ? `https://mg-beton.kz/beton/${gradeData.value.slug}`
    : 'https://mg-beton.kz/beton',
})

if (gradeData.value) {
  useSchemaOrg([
    defineWebPage({
      name: `Бетон ${gradeData.value.grade} в Алматы | MG Бетон`,
      description: gradeData.value.seo.description,
    }),
    defineProduct({
      name: `Бетон ${gradeData.value.grade}`,
      description: gradeData.value.seo.shortDescription,
      image: `https://mg-beton.kz${gradeData.value.image}`,
      offers: {
        price: gradeData.value.price,
        priceCurrency: 'KZT',
        availability: 'https://schema.org/InStock',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'reviewCount': '127',
      },
    }),
    defineBreadcrumb({
      itemListElement: [
        {
          name: 'Главная',
          item: 'https://mg-beton.kz/',
        },
        {
          name: 'Бетон',
          item: 'https://mg-beton.kz/#calc',
        },
        {
          name: `Бетон ${gradeData.value.grade}`,
          item: `https://mg-beton.kz/beton/${gradeData.value.slug}`,
        },
      ],
    }),
  ])

  defineQuestion({
    mainEntity: gradeData.value.seo.faq.map(item => ({
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
  <section v-if="gradeData" class="py-12 bg-white md:py-16">
    <div class="mx-auto px-4 container">
      <nav class="text-sm text-black/50 mb-6">
        <RouterLink to="/" class="transition hover:text-black">
          Главная
        </RouterLink>
        <span class="mx-2">/</span>
        <a href="/#calc" class="transition hover:text-black">
          Бетон
        </a>
        <span class="mx-2">/</span>
        <span class="text-black">{{ gradeData.grade }}</span>
      </nav>

      <div class="gap-10 grid items-start lg:grid-cols-2">
        <div>
          <img
            :src="gradeData.image"
            :alt="`Бетон ${gradeData.grade} в Алматы`"
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
            Бетон {{ gradeData.grade }} в Алматы с доставкой
          </h1>

          <p class="text-base text-black/70 leading-7 mb-6 md:text-lg">
            {{ gradeData.seo.shortDescription }}
          </p>

          <div class="mb-6 gap-4 grid sm:grid-cols-2">
            <div class="p-4 border border-black/10 rounded-2xl transition hover:shadow-sm hover:-translate-y-0.5">
              <div class="mb-3 flex gap-3 items-center">
                <div class="text-orange-600 rounded-2xl bg-orange-50 flex h-11 w-11 items-center justify-center">
                  <div class="i-mdi:weight-lifter h-6 w-6" />
                </div>
                <div class="text-sm text-black/50">
                  Класс прочности
                </div>
              </div>
              <div class="text-lg font-semibold">
                {{ gradeData.strengthClass }}
              </div>
            </div>

            <div class="p-4 border border-black/10 rounded-2xl transition hover:shadow-sm hover:-translate-y-0.5">
              <div class="mb-3 flex gap-3 items-center">
                <div class="text-blue-600 rounded-2xl bg-blue-50 flex h-11 w-11 items-center justify-center">
                  <div class="i-mdi:snowflake h-6 w-6" />
                </div>
                <div class="text-sm text-black/50">
                  Морозостойкость
                </div>
              </div>
              <div class="text-lg font-semibold">
                {{ gradeData.frostResistance }}
              </div>
            </div>

            <div class="p-4 border border-black/10 rounded-2xl transition hover:shadow-sm hover:-translate-y-0.5">
              <div class="mb-3 flex gap-3 items-center">
                <div class="text-cyan-700 rounded-2xl bg-cyan-50 flex h-11 w-11 items-center justify-center">
                  <div class="i-mdi:water-outline h-6 w-6" />
                </div>
                <div class="text-sm text-black/50">
                  Водонепроницаемость
                </div>
              </div>
              <div class="text-lg font-semibold">
                {{ gradeData.waterResistance }}
              </div>
            </div>

            <div class="p-4 border border-black/10 rounded-2xl transition hover:shadow-sm hover:-translate-y-0.5">
              <div class="mb-3 flex gap-3 items-center">
                <div class="text-green-600 rounded-2xl bg-green-50 flex h-11 w-11 items-center justify-center">
                  <div class="i-mdi:chart-bell-curve-cumulative h-6 w-6" />
                </div>
                <div class="text-sm text-black/50">
                  Подвижность
                </div>
              </div>
              <div class="text-lg font-semibold">
                {{ gradeData.mobility }}
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
                  от {{ gradeData.price.toLocaleString('ru-RU') }} ₸
                </div>
                <p class="text-sm text-black/60 leading-6 mt-2">
                  Точная стоимость зависит от объема, адреса доставки, времени подачи, марки бетона и дополнительных условий на объекте.
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
                Оперативный расчет стоимости
              </div>
            </div>

            <div class="p-4 border border-black/10 rounded-2xl flex gap-3 items-center">
              <div class="text-blue-600 rounded-xl bg-blue-50 flex h-10 w-10 items-center justify-center">
                <div class="i-mdi:clock-outline h-5 w-5" />
              </div>
              <div class="text-sm font-medium">
                Быстрая подача на объект
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
                Подбор марки под задачу
              </div>
            </div>
          </div>

          <RequestModal />
        </div>
      </div>
    </div>
  </section>

  <CalcTabs />

  <section v-if="gradeData" class="py-12 md:py-16">
    <div class="mx-auto px-4 container">
      <div class="max-w-5xl">
        <h2 class="text-2xl font-bold mb-4 md:text-3xl">
          Бетон {{ gradeData.grade }} — описание и особенности
        </h2>

        <div class="text-base text-black/70 leading-8 space-y-4">
          <p
            v-for="(paragraph, index) in gradeData.seo.fullDescription"
            :key="`full-description-${index}`"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <section v-if="gradeData" class="py-12 md:py-16">
    <div class="mx-auto px-4 container">
      <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-4 md:text-3xl">
          Где применяется бетон {{ gradeData.grade }}
        </h2>

        <p class="text-base text-black/70 leading-7 mb-6">
          Бетон {{ gradeData.grade }} используется в строительстве благодаря своим прочностным характеристикам и сфере применения. Ниже перечислены основные виды работ, где эта марка особенно востребована.
        </p>

        <ul class="gap-3 grid md:grid-cols-2">
          <li
            v-for="useCase in gradeData.seo.useCases"
            :key="useCase"
            class="p-4 border border-black/10 rounded-2xl flex gap-3 transition items-start hover:border-black/20 hover:shadow-sm"
          >
            <div class="text-orange-600 mt-0.5 rounded-xl bg-orange-50 flex shrink-0 h-10 w-10 items-center justify-center">
              <div class="i-mdi:hard-hat h-5 w-5" />
            </div>
            <span class="leading-6">{{ useCase }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section v-if="gradeData" class="py-12 bg-gray-50 md:py-16">
    <div class="mx-auto px-4 container">
      <div class="max-w-5xl">
        <h2 class="text-2xl font-bold mb-4 md:text-3xl">
          Преимущества бетона {{ gradeData.grade }}
        </h2>

        <div class="gap-4 grid md:grid-cols-2">
          <div
            v-for="advantage in gradeData.seo.advantages"
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

  <section v-if="gradeData" class="py-12 md:py-16">
    <div class="mx-auto px-4 container">
      <div class="gap-6 grid lg:grid-cols-2">
        <div class="p-6 border border-black/10 rounded-3xl md:p-8">
          <div class="text-orange-600 mb-4 rounded-2xl bg-orange-50 flex h-14 w-14 items-center justify-center">
            <div class="i-mdi:truck-fast-outline h-7 w-7" />
          </div>
          <h2 class="text-2xl font-bold mb-3">
            Доставка бетона {{ gradeData.grade }} по Алматы
          </h2>
          <div class="text-base text-black/70 leading-7 space-y-4">
            <p
              v-for="(paragraph, index) in gradeData.seo.deliveryText"
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
            Почему выбирают {{ gradeData.grade }} от MG Бетон
          </h2>
          <div class="text-base text-black/70 leading-7 space-y-4">
            <p
              v-for="(paragraph, index) in gradeData.seo.whyChooseText"
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
    v-if="gradeData"
    id="grade-faq"
    :faqs="gradeData.seo.faq"
    :title="`Часто задаваемые вопросы о бетоне ${gradeData.grade}`"
  />

  <section v-if="gradeData" class="py-12 md:py-16">
    <div class="mx-auto px-4 container">
      <div class="text-white px-6 py-8 rounded-3xl bg-black md:px-10 md:py-10">
        <div class="gap-8 grid lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div class="text-sm text-white/90 font-medium mb-3 px-4 py-2 rounded-full bg-white/10 inline-flex gap-2 items-center">
              <div class="i-mdi:phone-outline h-5 w-5" />
              Быстрый расчет стоимости
            </div>

            <h2 class="text-2xl font-bold md:text-3xl">
              Заказать бетон {{ gradeData.grade }} с доставкой
            </h2>

            <p class="text-white/80 mt-3 max-w-2xl">
              Оставьте заявку, и мы быстро рассчитаем стоимость с доставкой по Алматы, подскажем по объему,
              объясним отличия марок и поможем подобрать подходящий бетон под ваш объект.
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

  <section v-if="gradeData" class="pb-16">
    <div class="mx-auto px-4 container">
      <h2 class="text-2xl font-bold mb-6 md:text-3xl">
        Другие марки бетона
      </h2>

      <div class="gap-6 grid md:grid-cols-2 xl:grid-cols-3">
        <RouterLink
          v-for="item in otherGrades"
          :key="item.slug"
          :to="`/beton/${item.slug}`"
          class="group p-5 border border-black/10 rounded-2xl transition hover:border-black/30 hover:shadow-md hover:-translate-y-1"
        >
          <div class="flex gap-3 items-start justify-between">
            <div>
              <div class="text-xl font-semibold">
                Бетон {{ item.grade }}
              </div>
              <div class="text-sm text-black/60 mt-2">
                {{ item.strengthClass }} · {{ item.frostResistance }} · от {{ item.price }} ₸
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
          to="/"
          class="text-sm font-medium px-5 py-3 border border-black/10 rounded-xl inline-flex transition items-center hover:border-black/30 hover:bg-gray-50"
        >
          Вернуться на главную страницу
        </RouterLink>
      </div>
    </div>
  </section>

  <section v-else class="py-20">
    <div class="mx-auto px-4 text-center max-w-3xl">
      <h1 class="text-3xl font-bold">
        Марка бетона не найдена
      </h1>
      <p class="text-black/60 mt-4">
        Возможно, ссылка устарела или такой страницы пока нет.
      </p>
      <div class="mt-6">
        <RouterLink
          to="/"
          class="text-sm font-medium px-5 py-3 border border-black/10 rounded-xl inline-flex transition items-center hover:border-black/30 hover:bg-gray-50"
        >
          На главную
        </RouterLink>
      </div>
    </div>
  </section>
</template>
