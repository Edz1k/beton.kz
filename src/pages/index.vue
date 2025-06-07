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
            Производство бетона в Казахстане от 15.000 тг/м³
          </h1>
          <p class="text-base sm:text-lg">
            TOO «MG Бетон» предлагает высококачественные бетонные решения любых объемов и марок. Мы производим и поставляем бетон, керамзит, строительные растворы, обеспечивая ваш проект надежностью и долговечностью.
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
  <section class="px-4 py-16 bg-gray-50">
    <div class="mx-auto text-center container">
      <h2 class="text-2xl text-gray-900 font-bold mb-8 sm:text-4xl">
        Стоимость услуг бетонного насоса в Алматы
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
                Минимальное время
              </th>
              <th class="px-4 py-3">
                Стоимость (1 час)
              </th>
            </tr>
          </thead>
          <tbody class="divide-gray-200 divide-y">
            <tr class="bg-white">
              <td class="font-medium px-4 py-3">
                Стационарный — 80 м
              </td>
              <td class="px-4 py-3">
                3м x 8м
              </td>
              <td class="px-4 py-3">
                3 часа
              </td>
              <td class="text-main font-semibold px-4 py-3">
                от 30 000 тг
              </td>
            </tr>
            <tr class="bg-gray-50">
              <td class="font-medium px-4 py-3">
                32 метра
              </td>
              <td class="px-4 py-3">
                8м x 10м
              </td>
              <td class="px-4 py-3">
                3 часа
              </td>
              <td class="text-main font-semibold px-4 py-3">
                от 35 000 тг
              </td>
            </tr>
            <tr class="bg-white">
              <td class="font-medium px-4 py-3">
                37 метров
              </td>
              <td class="px-4 py-3">
                10м x 10м
              </td>
              <td class="px-4 py-3">
                3 часа
              </td>
              <td class="text-main font-semibold px-4 py-3">
                от 35 000 тг
              </td>
            </tr>
            <tr class="bg-gray-50">
              <td class="font-medium px-4 py-3">
                42 метра
              </td>
              <td class="px-4 py-3">
                12м x 12м
              </td>
              <td class="px-4 py-3">
                3 часа
              </td>
              <td class="text-main font-semibold px-4 py-3">
                от 40 000 тг
              </td>
            </tr>
            <tr class="bg-white">
              <td class="font-medium px-4 py-3">
                47 метров
              </td>
              <td class="px-4 py-3">
                12м x 12м
              </td>
              <td class="px-4 py-3">
                5 часов
              </td>
              <td class="text-main font-semibold px-4 py-3">
                от 40 000 тг
              </td>
            </tr>
            <tr class="bg-gray-50">
              <td class="font-medium px-4 py-3">
                52 метра
              </td>
              <td class="px-4 py-3">
                14м x 14м
              </td>
              <td class="px-4 py-3">
                5 часов
              </td>
              <td class="text-main font-semibold px-4 py-3">
                от 45 000 тг
              </td>
            </tr>
            <tr class="bg-white">
              <td class="font-medium px-4 py-3">
                62 метра
              </td>
              <td class="px-4 py-3">
                15м x 15м
              </td>
              <td class="px-4 py-3">
                5 часов
              </td>
              <td class="text-main font-semibold px-4 py-3">
                от 50 000 тг
              </td>
            </tr>
            <tr class="bg-gray-50">
              <td class="font-medium px-4 py-3">
                65 метра
              </td>
              <td class="px-4 py-3">
                15м x 15м
              </td>
              <td class="px-4 py-3">
                5 часов
              </td>
              <td class="text-main font-semibold px-4 py-3">
                от 55 000 тг
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Кнопка оставить заявку -->
      <div class="mt-10 flex justify-center">
        <RequestModal />
      </div>
    </div>
  </section>
  <section
    class="flex min-h-[80vh] items-center justify-center relative bg-cover bg-center bg-no-repeat"
    style="background-image: url('/ready.png');"
  >
    <!-- Затемнение -->
    <div class="bg-black/60 inset-0 absolute z-0" />

    <!-- Контент -->
    <div class="text-white px-4 text-center max-w-3xl relative z-10 animate-fade-in">
      <h2 class="text-3xl font-bold mb-4 sm:text-5xl">
        Готовы к сотрудничеству?
      </h2>
      <p class="text-base leading-relaxed mb-8 sm:text-lg">
        Свяжитесь с нами сегодня, чтобы обсудить ваш проект и узнать, как наши бетонные решения могут помочь вам достигнуть успеха. Мы готовы предложить индивидуальный подход и высококачественные материалы для любого строительного задания.
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
