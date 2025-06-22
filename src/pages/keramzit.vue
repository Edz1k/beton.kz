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
