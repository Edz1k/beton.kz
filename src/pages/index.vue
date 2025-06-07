<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <!-- HERO Section -->
  <section
    id="hero"
    class="bg-[url('/background.png')] flex min-h-screen items-center relative bg-cover bg-center"
  >
    <div class="bg-black/60 inset-0 absolute z-0" aria-hidden="true" />

    <div class="mx-auto px-4 relative z-10 container">
      <div class="text-white py-12 flex flex-col min-h-[70vh] items-start justify-center md:items-start">
        <div class="text-center w-full space-y-6 md:text-left md:w-1/2">
          <h1 class="text-4xl leading-tight font-bold md:text-6xl sm:text-5xl">
            Производство бетона в Казахстане от 15 000 тг/м³
          </h1>
          <p class="text-base sm:text-lg">
            Компания «MG Бетон» предлагает доставку и производство бетона, керамзита и растворов с гарантией качества по всей стране.
          </p>
          <div class="mt-6">
            <RequestModal />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Калькулятор -->
  <section id="calc" class="scroll-mt-16">
    <CalcTabs />
  </section>

  <!-- Таблица услуг -->
  <section id="services" class="px-4 py-16 bg-gray-50 scroll-mt-16">
    <div class="mx-auto text-center container">
      <h2 class="text-2xl text-gray-900 font-bold mb-8 sm:text-4xl">
        Услуги аренды бетонного насоса в Алматы
      </h2>

      <div class="border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
        <table class="text-sm text-gray-800 text-left min-w-full">
          <thead class="text-xs text-gray-700 tracking-wide font-semibold bg-gray-100 uppercase">
            <tr>
              <th class="px-4 py-3">
                Длина стрелы
              </th>
              <th class="px-4 py-3">
                Площадка
              </th>
              <th class="px-4 py-3">
                Мин. время
              </th>
              <th class="px-4 py-3">
                Цена (1 ч)
              </th>
            </tr>
          </thead>
          <tbody class="divide-gray-200 divide-y">
            <tr
              v-for="(item, index) in [
                ['Стационарный — 80 м', '3м x 8м', '3 часа', 'от 30 000 тг'],
                ['32 метра', '8м x 10м', '3 часа', 'от 35 000 тг'],
                ['37 метров', '10м x 10м', '3 часа', 'от 35 000 тг'],
                ['42 метра', '12м x 12м', '3 часа', 'от 40 000 тг'],
                ['47 метров', '12м x 12м', '5 часов', 'от 40 000 тг'],
                ['52 метра', '14м x 14м', '5 часов', 'от 45 000 тг'],
                ['62 метра', '15м x 15м', '5 часов', 'от 50 000 тг'],
                ['65 метра', '15м x 15м', '5 часов', 'от 55 000 тг'],
              ]" :key="index" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
            >
              <td class="font-medium px-4 py-3">
                {{ item[0] }}
              </td>
              <td class="px-4 py-3">
                {{ item[1] }}
              </td>
              <td class="px-4 py-3">
                {{ item[2] }}
              </td>
              <td class="text-main font-semibold px-4 py-3">
                {{ item[3] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-10 flex justify-center">
        <RequestModal />
      </div>
    </div>
  </section>

  <!-- CTA блок -->
  <section
    class="flex min-h-[80vh] items-center justify-center relative bg-cover bg-center bg-no-repeat"
    style="background-image: url('/ready.png');"
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
  </section>
</template>
