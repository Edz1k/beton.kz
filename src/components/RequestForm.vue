<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  boxed?: boolean
  submitText?: string
}>()

const form = ref({ name: '', phone: '', message: '' })
const submitted = ref(false)

async function handleSubmit() {
  await fetch('https://formspree.io/f/your_id', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form.value),
  })

  submitted.value = true
  form.value = { name: '', phone: '', message: '' }
}
</script>

<template>
  <form
    class="flex flex-col gap-4 w-full"
    :class="boxed && 'bg-white p-6 rounded shadow'"
    @submit.prevent="handleSubmit"
  >
    <input v-model="form.name" required placeholder="Имя" class="input">
    <input v-model="form.phone" required placeholder="Телефон" class="input">
    <textarea v-model="form.message" placeholder="Комментарий" class="input" rows="3" />
    <button type="submit" class="text-white py-2 rounded bg-accent">
      {{ submitText }}
    </button>
    <p v-if="submitted" class="text-sm text-green-600">
      Заявка отправлена!
    </p>
  </form>
</template>
