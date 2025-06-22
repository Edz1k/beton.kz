<script setup lang="ts">
defineProps<{
  grade: string
  description: string
  price: string
  f: string
  image: string
}>()
</script>

<script lang="ts">
function getUsage(grade: string) {
  switch (grade) {
    case 'M100': return 'подготовительных работ, стяжек, подушки под фундамент и дорожек'
    case 'M150': return 'отмосток, садовых дорожек и легких фундаментов'
    case 'M200': return 'плит перекрытия, лестничных маршей и полов'
    case 'M250': return 'фундаментов, заливки полов, монолитных работ'
    case 'M300': return 'монолитных перекрытий, стен и плит'
    case 'M350': return 'нагруженных колонн, ЖБИ изделий, лестниц, армопоясов'
    case 'M400': return 'банковских хранилищ, мостов, паркингов и эстакад'
    default: return 'строительных и ремонтных работ общего назначения'
  }
}
</script>

<template>
  <div
    class="rounded-2xl bg-white shadow-md transition overflow-hidden hover:shadow-xl"
    :title="`Бетон ${grade} купить в Алматы с доставкой по цене ${price} тенге за м³`"
  >
    <img
      :src="image"
      :alt="`Бетон ${grade} Алматы — цена за м³, доставка, ГОСТ`"
      class="h-56 w-full object-cover"
      loading="lazy"
    >
    <div class="p-5 space-y-3">
      <h3 class="text-xl text-gray-900 font-semibold">
        Бетон {{ grade }} — доставка по Алматы
      </h3>
      <p class="text-sm text-gray-700 leading-relaxed">
        Прочность: {{ description }}. Морозостойкость: F{{ f }}.
        Рекомендуется для {{ getUsage(grade) }}.
      </p>
      <div class="flex items-center justify-between">
        <span class="text-lg text-main font-bold">
          {{ price }} ₸ за м³
        </span>
        <RequestModal />
      </div>
    </div>
  </div>
</template>
