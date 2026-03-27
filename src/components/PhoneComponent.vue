<script setup lang="ts">
function trackCallClick(event?: MouseEvent) {
  if (event)
    event.preventDefault()

  const phoneUrl = 'tel:+77751442023'

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: 'AW-17169847962/bLEOCJioyZAcEJqtnPs_',
      event_callback: () => {
        window.location.href = phoneUrl
      },
    })

    setTimeout(() => {
      window.location.href = phoneUrl
    }, 500)
  }
  else {
    window.location.href = phoneUrl
  }
}
</script>

<template>
  <div class="bottom-4 left-4 fixed z-50">
    <!-- Плавающая кнопка -->
    <div class="p-4 rounded-full bg-blue-500 shadow-lg transition-all duration-300 relative hover:shadow-xl">
      <a
        href="tel:+77751442023"
        aria-label="Позвонить MG Бетон"
        @click="trackCallClick"
      >
        <div class="i-mdi:phone text-3xl text-white" />
      </a>
    </div>
  </div>
</template>
