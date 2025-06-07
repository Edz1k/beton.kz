<script setup lang="ts">
import { useTelegram } from '~/composables/useTelegramApi'

const username = ref('')
const phone = ref('')

const { sendMessage } = useTelegram()

function handleSend() {
  if (!username.value.trim() || !phone.value.trim())
    return

  const message = `📝 Заявка\n👤 Имя: ${username.value}\n📞 Телефон: ${phone.value}`
  sendMessage(message)
  username.value = ''
  phone.value = ''
}
</script>

<template>
  <div class="space-y-4">
    <UsernameInput v-model="username" />
    <PhoneInput v-model="phone" />
    <button
      class="text-white px-6 py-3 rounded-lg bg-main shadow-md transition-all hover:opacity-90"
      @click="handleSend"
    >
      Оставить заявку
    </button>
  </div>
</template>
