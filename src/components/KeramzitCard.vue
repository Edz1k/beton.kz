<script setup lang="ts">
defineProps<{
  name: string
  description: string
  price: string
  image: string
}>()
</script>

<template>
  <div
    class="rounded-2xl bg-white shadow-md transition overflow-hidden hover:shadow-xl"
    :title="`${name} купить в Алматы с доставкой — цена ${price} ₸`"
  >
    <img
      :src="image"
      :alt="`${name} — цена, доставка по Алматы`"
      class="h-56 w-full object-cover"
      loading="lazy"
    >
    <div class="p-5 space-y-3">
      <h3 class="text-lg text-gray-900 font-semibold">
        {{ name }}
      </h3>
      <p class="text-sm text-gray-700 leading-relaxed min-h-[100px]">
        {{ description }}
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
