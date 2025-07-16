<template>
  <div
    class="flex min-h-[80vh] items-center justify-center relative bg-cover bg-center bg-no-repeat"
    style="background-image: url('/ready.webp');"
  >
    <div class="bg-black/60 inset-0 absolute z-0" aria-hidden="true" />

    <div class="text-white px-4 text-center max-w-3xl relative z-10 animate-fade-in">
      <h2 class="text-3xl font-bold mb-4 sm:text-5xl">
        Готовы начать сотрудничество?
      </h2>
      <p class="text-base leading-relaxed mb-8 sm:text-lg">
        Свяжитесь с нами прямо сейчас, чтобы обсудить объёмы, сроки и цены. Мы готовы предложить индивидуальный подход к каждому клиенту и гарантировать качество на всех этапах.
      </p>

      <div class="flex flex-col gap-4 items-center justify-center sm:flex-row">
        <a
          href="tel:+77751442023"
          class="text-white font-medium px-6 py-3 rounded-lg bg-yellow-500 inline-flex gap-2 shadow transition-all duration-300 items-center hover:bg-yellow-600"
        >
          Позвонить
        </a>

        <RequestModal />
      </div>
    </div>
  </div>
</template>
