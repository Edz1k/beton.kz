<script setup lang="ts">
const phone = '+7 (777) 144-20-23'
const email = 'megabeton@mail.ru'
const address = 'г. Алматы, мкр. Кулагер, ул. Казыбаева, 262'

const whatsappLink = `https://wa.me/77771442023?text=${encodeURIComponent('Здравствуйте! Хочу заказать бетон.')}`
</script>

<template>
  <div class="text-gray-800 px-4 py-16 bg-white min-h-screen dark:text-gray-100 dark:bg-neutral-900">
    <div class="mx-auto gap-12 grid max-w-6xl md:grid-cols-2">
      <!-- Контакты -->
      <div class="text-left space-y-6">
        <h1 class="text-4xl font-bold mb-2 text-center md:text-left">
          Контакты
        </h1>
        <p class="text-lg text-gray-600 text-center dark:text-gray-400 md:text-left">
          Свяжитесь с нами удобным для вас способом — мы ответим быстро!
        </p>

        <div class="space-y-6">
          <div class="flex gap-4 items-center">
            <i class="i-tabler-phone-call text-2xl text-green-500" />
            <a :href="`tel:${phone}`" class="hover:underline">{{ phone }}</a>
          </div>

          <div class="flex gap-4 items-center">
            <i class="i-tabler-mail text-2xl text-blue-500" />
            <a :href="`mailto:${email}`" class="hover:underline">{{ email }}</a>
          </div>

          <div class="flex gap-4 items-center">
            <i class="i-tabler-map-pin text-2xl text-red-500" />
            <span>{{ address }}</span>
          </div>

          <div class="flex gap-4 items-center">
            <i class="i-tabler-brand-whatsapp text-2xl text-green-600" />
            <a
              :href="whatsappLink"
              target="_blank"
              class="text-green-600 hover:underline"
            >
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </div>

      <!-- Яндекс.Карта -->
      <div class="h-[400px] w-full">
        <iframe
          class="rounded-lg h-96 w-full shadow-md"
          src="https://yandex.kz/map-widget/v1/-/CHDXj--e"
          frameborder="0"
          allowfullscreen
        />
      </div>
    </div>
  </div>
</template>
