<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <section class="bg-[url('/background.png')] flex min-h-screen items-center relative bg-cover bg-center">
    <!-- Затемнение -->
    <div class="bg-black/60 inset-0 absolute z-0" />

    <!-- Контейнер -->
    <div class="mx-auto px-4 relative z-10 container">
      <div class="text-white py-12 flex flex-col min-h-[70vh] items-start justify-center md:min-h-[auto] md:items-start">
        <div class="text-center w-full space-y-6 md:text-left md:w-1/2">
          <h1 class="text-4xl leading-tight font-bold md:text-6xl sm:text-5xl">
            Производство бетона в Казахстане
          </h1>
          <p class="text-base sm:text-lg">
            TOO «MG Бетон» предлагает высококачественные бетонные решения и материалы по всему Казахстану. Мы производим и поставляем бетон, керамзит и строительные растворы, обеспечивая ваш проект надежностью и долговечностью.
          </p>
          <div class="mt-6">
            <RequestModal />
          </div>
        </div>
      </div>
    </div>
  </section>

  <section>
    <CalcTabs />
  </section>
</template>
