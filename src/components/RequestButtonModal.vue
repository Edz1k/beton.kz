<script setup>
import { ref } from 'vue'
import RequestForm from './RequestForm.vue'

const show = ref(false)

const open = () => (show.value = true)
const close = () => (show.value = false)
</script>

<template>
  <!-- Кнопка -->
  <button
    class="text-white px-6 py-3 rounded bg-accent transition hover:opacity-90"
    @click="open"
  >
    Оставить заявку
  </button>

  <!-- Модалка -->
  <div
    v-if="show"
    class="bg-black/50 flex items-center inset-0 justify-center fixed z-50 backdrop-blur-sm"
  >
    <div class="p-6 rounded-lg bg-white max-w-lg w-full shadow-lg relative">
      <!-- Закрытие -->
      <button
        class="text-xl text-gray-500 right-3 top-2 absolute hover:text-red-500"
        @click="close"
      >
        ×
      </button>

      <!-- Форма -->
      <RequestForm boxed submit-text="Отправить заявку" />
    </div>
  </div>
</template>
