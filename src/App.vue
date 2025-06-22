<script setup lang="ts">
import { useHead } from '@unhead/vue'
// App.vue (setup)
import { defineLocalBusiness, defineWebSite, useSchemaOrg } from '@vueuse/schema-org'

useSchemaOrg([
  defineWebSite({
    name: 'MG Бетон',
    url: 'https://mg-beton.kz',
    description: 'Производство и доставка бетона, раствора, керамзита и сопутствующих материалов по Казахстану.',
  }),

  defineLocalBusiness({
    name: 'MG Бетон',
    url: 'https://mg-beton.kz',
    image: 'https://mg-beton.kz/logo.png',
    telephone: '+77751442023',
    email: 'megabeton@mail.ru',
    description: 'Производство и доставка бетона по всему Казахстану. Бетон от 15 000 тг/м³. Услуги автобетононасоса, раствор, керамзит и другое.',
    address: {
      streetAddress: 'Улица Казыбаева, 262',
      addressLocality: 'Алматы',
      addressCountry: 'KZ',
    },
    openingHours: ['Mo-Sa 08:00-20:00'],
  }),
])

useHead({
  meta: [
    { name: 'robots', content: 'index, follow' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { charset: 'UTF-8' },
  ],
  link: [
    { rel: 'canonical', href: 'https://mg-beton.kz/' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
  ],
  script: [
    {
      async: true,
      src: 'https://www.googletagmanager.com/gtag/js?id=G-EK35CW4WFV',
    },
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){ dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-EK35CW4WFV', { page_path: window.location.pathname });
      `,
      type: 'text/javascript',
    },
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
