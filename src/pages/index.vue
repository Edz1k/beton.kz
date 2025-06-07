<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <section class="bg-[url('/background.png')] flex min-h-screen items-center relative bg-cover bg-center">
    <div class="mx-auto container">
      <!-- Затемнение -->
      <div class="bg-black/60 inset-0 absolute z-0" />

      <!-- Контент -->
      <div class="text-white px-4 py-12 w-1/2 relative z-10">
        <h1 class="text-6xl font-bold">
          Производство бетона в Казахстане
        </h1>
        <p class="text-lg mt-4">
          TOO «MG Бетон» предлагает высококачественные бетонные решения и материалы по всему Казахстану. Мы производим и поставляем бетон, керамзит и строительные растворы, обеспечивая ваш проект надежностью и долговечностью.
        </p>
        <div class="mt-8 relative z-10">
          <RequestModal />
        </div>
      </div>
    </div>
  </section>
</template>
