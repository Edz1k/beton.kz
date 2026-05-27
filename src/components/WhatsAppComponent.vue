<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getConcreteGradeBySlug } from '~/data/concrete-grades'
import { getKeramzitProductBySlug } from '~/data/keramzit-products'

const route = useRoute()

function trackWhatsAppClick() {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'click_whatsapp', {
      event_category: 'engagement',
      event_label: 'Кнопка WhatsApp (floating)',
    })
  }
}

const message = computed(() => {
  const path = route.path
  const params = route.params as Partial<Record<'grade' | 'slug', string | string[]>>
  const gradeParam = Array.isArray(params.grade) ? params.grade[0] : params.grade
  const slugParam = Array.isArray(params.slug) ? params.slug[0] : params.slug

  if (path.startsWith('/keramzit/')) {
    const product = getKeramzitProductBySlug(slugParam)
    const productName = product?.name || 'керамзит'

    return `Здравствуйте! Интересует ${productName} с доставкой по Алматы. Подскажите, пожалуйста, цену, наличие и условия доставки.`
  }

  if (path === '/keramzit') {
    return 'Здравствуйте! Интересует керамзит с доставкой по Алматы. Помогите подобрать фракцию и рассчитать стоимость.'
  }

  if (path.startsWith('/beton/')) {
    const grade = getConcreteGradeBySlug(gradeParam)
    const gradeName = grade ? `бетон ${grade.grade}` : 'бетон'

    return `Здравствуйте! Интересует ${gradeName} с доставкой по Алматы. Подскажите, пожалуйста, цену за куб и условия заказа.`
  }

  if (path === '/services') {
    return 'Здравствуйте! Интересует услуга бетонного насоса в Алматы. Подскажите, пожалуйста, стоимость и условия подачи бетона.'
  }

  if (path.startsWith('/articles')) {
    return 'Здравствуйте! Я прочитал статью на сайте MG Бетон и хочу получить консультацию по бетону или керамзиту.'
  }

  if (path === '/contacts') {
    return 'Здравствуйте! Хочу связаться с MG Бетон и уточнить условия заказа и доставки.'
  }

  return 'Здравствуйте! Я хочу заказать бетон с доставкой по Алматы. Подскажите, пожалуйста, как оформить заказ?'
})

const whatsappUrl = computed(() =>
  `https://wa.me/77751442023?text=${encodeURIComponent(message.value)}`,
)
</script>

<template>
  <div class="bottom-4 right-4 fixed z-50">
    <!-- Кнопка -->
    <div class="p-4 rounded-full bg-green-500 shadow-lg transition-all duration-300 relative hover:shadow-xl">
      <a
        target="_blank"
        :href="whatsappUrl"
        aria-label="Открыть чат в WhatsApp"
        @click="trackWhatsAppClick"
      >

        <div class="i-mdi:whatsapp text-3xl text-white" />
      </a>
    </div>
  </div>
</template>
