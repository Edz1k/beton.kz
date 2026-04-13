<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'
import { defineProduct, defineQuestion, defineWebPage, useSchemaOrg } from '@vueuse/schema-org'
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
  ogUrl: () => gradeData.value ? `https://mg-beton.kz/beton/${gradeData.value.slug}` : 'https://mg-beton.kz/beton',
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
            class="rounded-2xl w-full shadow-sm object-cover"
            loading="eager"
          >
        </div>

        <div>
          <h1 class="text-3xl leading-tight font-bold mb-4 md:text-5xl">
            Бетон {{ gradeData.grade }} в Алматы с доставкой
          </h1>

          <p class="text-base text-black/70 leading-7 mb-6 md:text-lg">
            {{ gradeData.seo.shortDescription }}
          </p>

          <div class="mb-6 gap-4 grid sm:grid-cols-2">
            <div class="p-4 border border-black/10 rounded-2xl">
              <div class="text-sm text-black/50">
                Класс прочности
              </div>
              <div class="text-lg font-semibold mt-1">
                {{ gradeData.strengthClass }}
              </div>
            </div>

            <div class="p-4 border border-black/10 rounded-2xl">
              <div class="text-sm text-black/50">
                Морозостойкость
              </div>
              <div class="text-lg font-semibold mt-1">
                {{ gradeData.frostResistance }}
              </div>
            </div>

            <div class="p-4 border border-black/10 rounded-2xl">
              <div class="text-sm text-black/50">
                Водонепроницаемость
              </div>
              <div class="text-lg font-semibold mt-1">
                {{ gradeData.waterResistance }}
              </div>
            </div>

            <div class="p-4 border border-black/10 rounded-2xl">
              <div class="text-sm text-black/50">
                Подвижность
              </div>
              <div class="text-lg font-semibold mt-1">
                {{ gradeData.mobility }}
              </div>
            </div>
          </div>

          <div class="mb-8 p-5 rounded-2xl bg-gray-50">
            <div class="text-sm text-black/50">
              Цена за м³
            </div>
            <div class="text-3xl font-bold mt-1">
              от {{ gradeData.price.toLocaleString("ru-RU") }} ₸
            </div>
            <p class="text-sm text-black/60 leading-6 mt-2">
              Точная стоимость зависит от объема, адреса доставки и дополнительных условий на объекте.
            </p>
          </div>

          <RequestModal />
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
          Бетон {{ gradeData.grade }} используется в строительстве благодаря своим прочностным характеристикам и универсальности.
          Эта марка подходит для разных типов работ в зависимости от проекта, расчетной нагрузки и требований к надежности конструкции.
        </p>

        <ul class="gap-3 grid md:grid-cols-2">
          <li
            v-for="useCase in gradeData.seo.useCases"
            :key="useCase"
            class="p-4 border border-black/10 rounded-2xl"
          >
            {{ useCase }}
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section v-if="gradeData" class="py-12 bg-gray-50 md:py-16">
    <div class="mx-auto px-4 container">
      <div class="max-w-4xl">
        <h2 class="text-2xl font-bold mb-4 md:text-3xl">
          Преимущества бетона {{ gradeData.grade }}
        </h2>

        <div class="gap-4 grid md:grid-cols-2">
          <div
            v-for="advantage in gradeData.seo.advantages"
            :key="advantage"
            class="p-5 rounded-2xl bg-white shadow-sm"
          >
            {{ advantage }}
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
        <h2 class="text-2xl font-bold md:text-3xl">
          Заказать бетон {{ gradeData.grade }} с доставкой
        </h2>
        <p class="text-white/80 mt-3 max-w-2xl">
          Оставьте заявку, и мы быстро рассчитаем стоимость с доставкой по Алматы, подскажем по объему и поможем подобрать нужную марку.
        </p>

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
          <div class="text-xl font-semibold">
            Бетон {{ item.grade }}
          </div>
          <div class="text-sm text-black/60 mt-2">
            {{ item.strengthClass }} · {{ item.frostResistance }} · от {{ item.price }} ₸
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
