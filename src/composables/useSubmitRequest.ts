import { ref } from 'vue'

export function useSubmitRequest() {
  const loading = ref(false)
  const success = ref(false)

  const submit = async (data: {
    name: string
    phone: string
    message?: string
  }) => {
    loading.value = true
    try {
      await fetch('https://formspree.io/f/your_id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      success.value = true
    }
    catch (e) {
      console.error('Ошибка при отправке', e)
    }
    finally {
      loading.value = false
    }
  }

  return { submit, loading, success }
}
