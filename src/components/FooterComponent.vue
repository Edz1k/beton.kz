<template>
  <footer class="text-gray-800 pb-6 pt-12 bg-white">
    <div class="mx-auto px-4 gap-10 grid container md:grid-cols-3">
      <!-- Логотип и описание -->
      <div class="space-y-4">
        <img src="/logo.png" alt="MG Beton Logo" class="w-32">
        <p class="text-sm leading-relaxed">
          ТОО «MG Бетон» — ваш надёжный поставщик бетона и строительных смесей по всему Казахстану. Мы предлагаем качественные материалы и индивидуальный подход к каждому проекту.
        </p>
      </div>

      <!-- Навигация -->
      <div>
        <h3 class="text-lg text-main font-semibold mb-4">
          Навигация
        </h3>
        <ul class="text-sm space-y-2">
          <li><a href="#hero" class="hover:underline">Главная</a></li>
          <li><a href="#products" class="hover:underline">Продукция</a></li>
          <li><a href="#about" class="hover:underline">О компании</a></li>
          <li><a href="#contacts" class="hover:underline">Контакты</a></li>
          <li><a href="#pricing" class="hover:underline">Прайс-лист</a></li>
        </ul>
      </div>

      <!-- Обратная связь -->
      <div>
        <h3 class="text-lg text-main font-semibold mb-4">
          Обратная связь
        </h3>
        <p class="text-sm mb-4">
          Оставьте заявку, и мы свяжемся с вами в ближайшее время
        </p>
        <Feetback />
      </div>
    </div>

    <!-- Нижняя панель -->
    <div class="text-sm text-gray-500 mx-auto mt-10 px-4 pt-4 border-t border-gray-200 flex flex-col items-center justify-between container sm:flex-row">
      <p class="mb-2 sm:mb-0">
        &copy; 2024 MG Бетон | Все права защищены
      </p>
      <div class="text-xl text-gray-600 flex gap-4">
        <a href="https://wa.me/77751442023" target="_blank" aria-label="WhatsApp">
          <div class="i-mdi:whatsapp transition duration-200 hover:text-green-500" />
        </a>
        <a href="https://instagram.com" target="_blank" aria-label="Instagram">
          <div class="i-mdi:instagram transition duration-200 hover:text-pink-500" />
        </a>
      </div>
    </div>
  </footer>
</template>
