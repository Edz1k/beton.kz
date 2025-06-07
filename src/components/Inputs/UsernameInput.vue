<script setup lang="ts">
const name = defineModel<string>()
</script>

<template>
  <div class="w-full relative">
    <!-- Иконка -->
    <div
      class="i-mdi:account text-xl text-gray-400 transition-colors duration-300 left-4 top-1/2 absolute peer-focus:text-accent -translate-y-1/2"
    />

    <!-- Инпут -->
    <input
      v-model="name"
      type="text"
      placeholder="Ваше имя"
      class="peer text-lg text-textColor py-3 pl-12 pr-4 border border-concrete rounded-lg w-full transition-all duration-300 focus:outline-none hover:border-main focus:ring-2 focus:ring-main hover:shadow-md"
    >
  </div>
</template>
