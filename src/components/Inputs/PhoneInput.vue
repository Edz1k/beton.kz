<script setup lang="ts">
import Inputmask from 'inputmask'
import { onMounted, ref } from 'vue'

const phone = defineModel<string>()
const input = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (input.value) {
    Inputmask({ mask: '+7 (999) 999-99-99' }).mask(input.value)
  }
})
</script>

<template>
  <div class="w-full">
    <label class="text-sm text-textColor mb-1 block" for="phone">Номер телефона</label>
    <input
      id="phone"
      ref="input"
      v-model="phone"
      type="tel"
      class="text-textColor px-4 py-2 border border-concrete rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-accent"
      placeholder="+7 (___) ___-__-__"
    >
  </div>
</template>
