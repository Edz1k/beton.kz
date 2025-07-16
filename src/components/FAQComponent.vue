<script setup lang="ts">
import { ref } from 'vue'

interface FaqItem {
  question: string
  answer: string
}

const props = withDefaults(
  defineProps<{
    title?: string
    faqs: FaqItem[]
  }>(),
  {
    title: 'Часто задаваемые вопросы',
  },
)

const open = ref<number | null>(null)
</script>

<template>
  <section class="py-16 border-t border-gray-200 bg-white">
    <div class="mx-auto px-4 container">
      <h2 class="text-3xl font-bold mb-10 text-center md:text-4xl">
        {{ title }}
      </h2>

      <dl class="mx-auto max-w-3xl divide-gray-200 divide-y">
        <div
          v-for="(faq, index) in props.faqs"
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
