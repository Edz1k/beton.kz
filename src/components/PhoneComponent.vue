<script setup lang="ts">
function trackCallClick() {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'click_to_call', {
      event_category: 'engagement',
      event_label: 'Кнопка Позвонить (floating)',
    })
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
