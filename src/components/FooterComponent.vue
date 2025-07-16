<template>
  <footer class="text-gray-800 pb-6 pt-12 bg-white">
    <div class="mx-auto px-4 gap-10 grid container md:grid-cols-4">
      <!-- Логотип и описание -->
      <div class="space-y-4">
        <img src="/logo.png" alt="MG Beton Logo" class="w-32" loading="lazy">
        <p class="text-sm leading-relaxed">
          ТОО «MG Бетон» — ваш надёжный поставщик бетона и строительных смесей по всему Казахстану. Качество, надёжность и соблюдение сроков.
        </p>
      </div>

      <!-- Навигация -->
      <div>
        <h3 class="text-lg text-main font-semibold mb-4">
          Навигация
        </h3>
        <ul class="text-sm space-y-2">
          <li class="hover:underline">
            <RouterLink to="/">
              Главная
            </RouterLink>
          </li>
          <li class="hover:underline">
            <RouterLink to="/keramzit">
              Керамзит
            </RouterLink>
          </li>
          <li class="hover:underline">
            <RouterLink to="/services">
              Бетонные насосы
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- Контакты -->
      <div>
        <h3 class="text-lg text-main font-semibold mb-4">
          Контакты
        </h3>
        <ul class="text-sm space-y-2">
          <li>
            <span class="font-medium">Телефон:</span>
            <a href="tel:+77751442023" class="block hover:underline">+7 (775) 144 2023</a>
          </li>
          <li>
            <span class="font-medium">Email:</span>
            <a href="mailto:megabeton@mail.ru" class="block hover:underline">megabeton@mail.ru</a>
          </li>
          <li>
            <span class="font-medium">Адрес:</span>
            <address class="block not-italic">
              г. Алматы, ул. Казыбаева, 262
            </address>
          </li>
        </ul>
      </div>

      <!-- Обратная связь -->
      <div>
        <h3 class="text-lg text-main font-semibold mb-4">
          Обратная связь
        </h3>
        <p class="text-sm mb-4">
          Оставьте заявку, и мы свяжемся с вами в ближайшее время.
        </p>
        <Feetback />
      </div>
    </div>

    <!-- Нижняя панель -->
    <div class="text-sm text-gray-500 mx-auto mt-10 px-4 pt-4 border-t border-gray-200 flex flex-col items-center justify-between container sm:flex-row">
      <p class="mb-2 sm:mb-0">
        &copy; {{ new Date().getFullYear() }} MG Бетон | Все права защищены
      </p>
      <div class="text-xl text-gray-600 flex gap-4">
        <a href="https://wa.me/77751442023" target="_blank" rel="noopener" aria-label="WhatsApp">
          <div class="i-mdi:whatsapp transition duration-200 hover:text-green-500" />
        </a>
        <a href="https://www.instagram.com/mg_betonalmaty?utm_source=ig_web_button_share_sheet&igsh=MWo3aWt3ZmxkcnNvbQ==" target="_blank" rel="noopener" aria-label="Instagram">
          <div class="i-mdi:instagram transition duration-200 hover:text-pink-500" />
        </a>
      </div>
    </div>
  </footer>
</template>
