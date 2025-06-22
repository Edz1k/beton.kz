<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'Керамзит с доставкой в Алматы — MG Бетон',
  meta: [
    {
      name: 'description',
      content:
        'Керамзит фракций 5–10 и 10–20 мм. Доставка по Алматы. В мешках и россыпью. Утепление, отсыпка, строительство. Актуальные цены.',
    },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'Керамзит Алматы — доставка за 2 часа' },
    { property: 'og:description', content: 'Керамзит в мешках и россыпью. Быстрая доставка по городу.' },
    { property: 'og:image', content: 'https://mg-beton.kz/og-keramzit.png' },
    { property: 'og:url', content: 'https://mg-beton.kz/keramzit' },
  ],
  link: [{ rel: 'canonical', href: 'https://mg-beton.kz/keramzit' }],
})
</script>

<template>
  <section
    id="hero"
    class="bg-[url('/keramzit/bg.png')] flex min-h-screen items-center relative bg-cover bg-center"
  >
    <div class="bg-black/60 inset-0 absolute z-0" aria-hidden="true" />

    <div class="mx-auto px-4 relative z-10 container">
      <div class="text-white py-12 flex flex-col min-h-[70vh] items-start justify-center md:items-start">
        <div class="text-center w-full space-y-6 md:text-left md:w-1/2">
          <h1 class="text-4xl leading-tight font-bold md:text-6xl sm:text-5xl">
            Керамзит с доставкой по Алматы от 15 000 ₸
          </h1>
          <p class="text-base sm:text-lg">
            Компания «MG Бетон» предоставляет керамзит для строительных и утеплительных работ с гарантией качества и быстрой доставкой по Алматы.
          </p>
          <div class="mt-6">
            <RequestModal />
          </div>
        </div>
      </div>
    </div>
  </section>

  <section>
    <KeramzitCalc />
  </section>
</template>
