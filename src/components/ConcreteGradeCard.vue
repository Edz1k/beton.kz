<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  grade: string
  description: string
  price: string
  f: string
  image: string
  to?: string
}

const props = defineProps<Props>()

const usageMap: Record<string, string> = {
  M100: 'подготовительных работ, стяжек, подушки под фундамент и дорожек',
  M150: 'отмосток, садовых дорожек и легких фундаментов',
  M200: 'плит перекрытия, лестничных маршей и полов',
  M250: 'фундаментов, заливки полов и монолитных работ',
  M300: 'монолитных перекрытий, стен и плит',
  M350: 'нагруженных колонн, ЖБИ изделий, лестниц и армопоясов',
  M400: 'банковских хранилищ, мостов, паркингов и эстакад',
}

const usageText = computed(() => {
  return usageMap[props.grade] ?? 'строительных и ремонтных работ общего назначения'
})

const cardTitle = computed(() => {
  return `Бетон ${props.grade} купить в Алматы с доставкой по цене ${props.price} тенге за м³`
})

const cardAlt = computed(() => {
  return `Бетон ${props.grade} Алматы — цена за м³, доставка, ГОСТ`
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
      <h3 class="text-xl text-gray-900 font-semibold">
        Бетон {{ grade }} — доставка по Алматы
      </h3>

      <p class="text-sm text-gray-700 leading-relaxed">
        Прочность: {{ description }}.
        Морозостойкость: F{{ f }}.
        Рекомендуется для {{ usageText }}.
      </p>

      <div class="pt-1 flex gap-3 items-center justify-between">
        <span class="text-lg text-main font-bold">
          {{ price }} ₸ за м³
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
