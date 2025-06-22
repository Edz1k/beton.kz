<script setup lang="ts">
import { onMounted, ref } from 'vue'

const open = ref<number | null>(null)

const faqs = [
  {
    question: 'Какая марка бетона подходит для фундамента?',
    answer: 'Для заливки фундамента частного дома чаще всего используют бетон М300 или бетон М350. Эти марки обеспечивают необходимую прочность, устойчивость к влаге и морозу.',
  },
  {
    question: 'В чём разница между бетоном М250 и М350?',
    answer: 'Бетон М250 — это более бюджетный вариант, используется для стяжек и полов. Бетон М350 — более прочный, применяется в строительстве колонн, плит перекрытия и монолитных конструкций.',
  },
  {
    question: 'Как выбрать нужную марку бетона?',
    answer: 'Выбор зависит от типа конструкции: для дорожек подойдёт М200–М250, для ленточного фундамента — бетон М300, для нагруженных конструкций — М350 и выше. Наши специалисты бесплатно помогут определиться.',
  },
  {
    question: 'Соответствует ли ваш бетон ГОСТу?',
    answer: 'Да, весь наш бетон производится по ГОСТ и сопровождается паспортом качества. Это гарантирует соответствие заявленной марке и характеристикам.',
  },
]

// SEO: Structured data for rich snippet
onMounted(() => {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.innerHTML = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(f => ({
      '@type': 'Question',
      'name': f.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': f.answer,
      },
    })),
  })
  document.head.appendChild(script)
})
</script>

<template>
  <section class="py-16 border-t border-gray-200 bg-white">
    <div class="mx-auto px-4 container">
      <h2 class="text-3xl font-bold mb-10 text-center md:text-4xl">
        Часто задаваемые вопросы о марках бетона
      </h2>

      <dl class="mx-auto max-w-3xl divide-gray-200 divide-y">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="py-5 cursor-pointer"
          @click="open = open === index ? null : index"
        >
          <dt class="text-lg font-medium flex items-center justify-between">
            <span>{{ faq.question }}</span>
            <span class="text-xl text-main">
              {{ open === index ? '−' : '+' }}
            </span>
          </dt>
          <transition name="fade">
            <dd v-if="open === index" class="text-gray-600 mt-3">
              {{ faq.answer }}
            </dd>
          </transition>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
