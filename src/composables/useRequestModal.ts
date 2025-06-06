import { ref } from 'vue'

const showRequestModal = ref(false)

export function useRequestModal() {
  return {
    showRequestModal,
    openModal: () => (showRequestModal.value = true),
    closeModal: () => (showRequestModal.value = false),
  }
}
