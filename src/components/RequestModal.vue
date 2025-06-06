<script setup>
import { useRequestModal } from '~/composables/useRequestModal'
import RequestForm from './RequestForm.vue'

const { showRequestModal, closeModal } = useRequestModal()
</script>

<template>
  <div
    v-if="showRequestModal"
    class="bg-black/50 flex items-center inset-0 justify-center fixed z-50 backdrop-blur-sm"
  >
    <div class="p-6 rounded-lg bg-white max-w-lg w-full shadow-lg relative">
      <button class="text-xl right-3 top-2 absolute" @click="closeModal">
        ×
      </button>
      <RequestForm boxed submit-text="Отправить заявку" />
    </div>
  </div>
</template>
