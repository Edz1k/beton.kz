<script setup lang="ts">
function trackWhatsAppClick() {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'click_whatsapp', {
      event_category: 'engagement',
      event_label: 'Кнопка WhatsApp (floating)',
    })
  }
}
</script>

<template>
  <div class="bottom-4 right-4 fixed z-50">
    <!-- Кнопка -->
    <div class="p-4 rounded-full bg-green-500 shadow-lg transition-all duration-300 relative hover:shadow-xl">
      <a
        target="_blank"
        href="https://wa.me/77751442023"
        aria-label="Открыть чат в WhatsApp"
        @click="trackWhatsAppClick"
      >
        <div class="i-mdi:whatsapp text-3xl text-white" />
      </a>
    </div>
  </div>
</template>
