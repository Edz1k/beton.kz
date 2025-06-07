<script setup lang="ts">
import { useTelegram } from '~/composables/useTelegramApi'

const username = ref('')
const phone = ref('')

const { sendMessage } = useTelegram()

function handleSend() {
  if (!username.value.trim() || !phone.value.trim())
    return

  // Отправка события в Google Analytics
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'form_submit', {
      event_category: 'lead',
      event_label: 'Форма в футере',
      value: 1,
    })
  }

  // Отправка в Telegram
  const message = `📝 Заявка\n👤 Имя: ${username.value}\n📞 Телефон: ${phone.value}`
  sendMessage(message)
  username.value = ''
  phone.value = ''
}
</script>

<template>
  <div class="space-y-4" aria-label="Форма обратной связи MG Бетон">
    <UsernameInput v-model="username" aria-label="Введите ваше имя" />
    <PhoneInput v-model="phone" aria-label="Введите ваш номер телефона" />
    <button
      class="text-white px-6 py-3 rounded-lg bg-main shadow-md transition-all hover:opacity-90"
      aria-label="Отправить заявку"
      @click="handleSend"
    >
      Оставить заявку
    </button>
  </div>
</template>
