<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
  description?: string
  price: number
  fraction: string
  image: string
  slug: string
  type?: 'glinyanyj' | 'slancevyj'
  to?: string
  seo?: {
    shortDescription: string
  }
}>()

const usageMap: Record<string, string> = {
  'glinyanyj-5-20': 'утепления полов, легких стяжек, засыпки и строительных работ',
  'glinyanyj-20-40': 'дренажа, шумоизоляции, отсыпки и заполнения пустот',
  'slancevyj-5-20': 'более нагруженных конструкций, утепления и специальных строительных задач',
  'slancevyj-20-40': 'дренажных систем, крупной отсыпки и участков с повышенной нагрузкой',
}

const usageText = computed(() => {
  return usageMap[props.slug] ?? 'строительных и ремонтных работ общего назначения'
})

const materialTypeText = computed(() => {
  if (props.type === 'glinyanyj')
    return 'Глиняный'
  if (props.type === 'slancevyj')
    return 'Сланцевый'
  return 'Керамзит'
})

const cardTitle = computed(() => {
  return `${props.name} купить в Алматы с доставкой по цене ${props.price.toLocaleString('ru-RU')} тенге за м³`
})

const cardAlt = computed(() => {
  return `${props.name} — цена за м³, характеристики и доставка по Алматы`
})

const descriptionText = computed(() => {
  return props.description || props.seo?.shortDescription
})
</script>

<template>
  <component
    :is="to ? 'RouterLink' : 'div'"
    :to="to"
    class="group rounded-2xl bg-white block shadow-md transition overflow-hidden hover:shadow-xl hover:-translate-y-1"
    :title="cardTitle"
  >
    <img
      :src="image"
      :alt="cardAlt"
      class="h-56 w-full transition duration-500 object-cover group-hover:scale-[1.03]"
      loading="lazy"
    >

    <div class="p-5 space-y-3">
      <h3 class="text-xl text-gray-900 leading-snug font-semibold">
        {{ name }} — доставка по Алматы
      </h3>

      <p class="text-sm text-gray-700 leading-relaxed">
        <template v-if="descriptionText">
          {{ descriptionText }}
        </template>
        <template v-else>
          Тип: {{ materialTypeText }}.
          Фракция: {{ fraction }}.
          Рекомендуется для {{ usageText }}.
        </template>
      </p>

      <div class="pt-1 flex gap-3 items-center justify-between">
        <span class="text-lg text-main font-bold">
          от {{ price.toLocaleString('ru-RU') }} ₸ за м³
        </span>

        <span
          v-if="to"
          class="text-sm text-gray-900 font-medium inline-flex transition items-center group-hover:translate-x-1"
        >
          Подробнее →
        </span>

        <RequestModal v-else />
      </div>
    </div>
  </component>
</template>
