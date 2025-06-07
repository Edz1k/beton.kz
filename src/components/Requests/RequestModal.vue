<!-- components/RequestModal.vue -->
<script setup lang="ts">
import { useTelegram } from '~/composables/useTelegramApi'

const { sendMessage } = useTelegram()
const isOpen = ref(false)
const name = ref('')
const phone = ref('')

function openModal() {
  isOpen.value = true
}

function closeModal() {
  isOpen.value = false
}

function handleSend() {
  if (!name.value.trim() || !phone.value.trim()) {
    return
  }

  const message = `📝 Заявка\n👤 Имя: ${name.value}\n📞 Телефон: ${phone.value}`
  sendMessage(message)
  name.value = ''
  phone.value = ''
  closeModal()
}
</script>

<template>
  <!-- Кнопка открытия -->
  <button class="text-white px-6 py-3 rounded-lg bg-main shadow-md transition-all hover:opacity-90" @click="openModal">
    Оставить заявку
  </button>

  <!-- Модалка -->
  <div v-if="isOpen" class="bg-black/40 flex items-center inset-0 justify-center fixed z-50 backdrop-blur-sm">
    <div class="p-6 rounded-xl bg-white max-w-md w-full shadow-xl relative">
      <!-- Закрыть -->
      <button class="text-2xl text-gray-400 transition-500 right-3 top-3 absolute hover:text-red-500" @click="closeModal">
        &times;
      </button>

      <!-- Заголовок -->
      <h2 class="text-xl text-textColor font-semibold mb-4 text-center">
        Оставьте заявку
      </h2>

      <!-- Поля -->
      <div class="space-y-4">
        <UsernameInput v-model="name" />
        <PhoneInput v-model="phone" />
      </div>

      <!-- Кнопка -->
      <button
        class="text-white font-semibold mt-6 py-3 rounded-lg bg-main w-full transition-all hover:opacity-90"
        @click="handleSend"
      >
        Отправить
      </button>
    </div>
  </div>
</template>
