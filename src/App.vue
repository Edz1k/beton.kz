<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'

const route = useRoute()

useHead({
  meta: [
    { name: 'robots', content: 'index, follow' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { charset: 'UTF-8' },
  ],
  link: [
    { rel: 'canonical', href: `https://mg-beton.kz${route.path}` },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
  ],
})
</script>

<template>
  <main font-sans>
    <NavigationComponent />
    <RouterView />
    <PhoneComponent />
    <WhatsAppComponent />
    <FooterComponent />
  </main>
</template>
