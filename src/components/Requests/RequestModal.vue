<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useTelegram } from '~/composables/useTelegramApi'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

function trackLeadEvent() {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'submit_form', {
      event_category: 'lead',
      event_label: 'Форма заявки',
      value: 1,
    })
  }
}

const { sendMessage } = useTelegram()
const isOpen = ref(false)
const name = ref('')
const phone = ref('')

function openModal() {
  isOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  isOpen.value = false
  document.body.style.overflow = ''
}

function onEsc(e: KeyboardEvent) {
  if (e.key === 'Escape')
    closeModal()
}

onMounted(() => {
  window.addEventListener('keydown', onEsc)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onEsc)
  document.body.style.overflow = ''
})

function handleSend() {
  if (!name.value.trim() || !phone.value.trim())
    return

  const message = `📝 Заявка\n👤 Имя: ${name.value}\n📞 Телефон: ${phone.value}`
  sendMessage(message)

  trackLeadEvent()

  name.value = ''
  phone.value = ''
  closeModal()
}
</script>

<template>
  <button
    class="text-white px-6 py-3 rounded-lg bg-main shadow-md transition-all hover:opacity-90"
    @click="openModal"
  >
    Оставить заявку
  </button>

  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="p-4 bg-black/40 flex items-center inset-0 justify-center fixed z-[9999] backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        @click.self="closeModal"
      >
        <div
          class="p-6 rounded-xl bg-white max-w-md w-full shadow-xl relative"
          role="document"
        >
          <button
            class="text-2xl text-gray-400 transition right-3 top-3 absolute hover:text-red-500"
            aria-label="Закрыть окно"
            @click="closeModal"
          >
            &times;
          </button>

          <h2
            id="modal-title"
            class="text-xl text-textColor font-semibold mb-4 text-center"
          >
            Оставьте заявку
          </h2>

          <div class="space-y-4">
            <UsernameInput v-model="name" aria-label="Имя" />
            <PhoneInput v-model="phone" aria-label="Телефон" />
          </div>

          <button
            class="text-white font-semibold mt-6 py-3 rounded-lg bg-main w-full transition-all hover:opacity-90"
            @click="handleSend"
          >
            Отправить
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
