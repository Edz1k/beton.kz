<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

defineOptions({ name: 'NavigationComponent' })

const route = useRoute()

const links = [
  { label: 'Главная', href: '/' },
  { label: 'Керамзит', href: '/keramzit' },
  { label: 'Бетонный насос', href: '/services' },
  { label: 'Контакты', href: '/contacts' },
]

const isOpen = ref(false)
</script>

<template>
  <header class="text-textColor py-4 border-b border-concrete bg-white/90 shadow-sm top-0 sticky z-50 backdrop-blur-xs">
    <div class="mx-auto px-4 flex h-16 items-center justify-between md:px-8 container">
      <!-- Логотип -->
      <RouterLink to="/" class="flex gap-2 items-center animate-fade-in" aria-label="На главную">
        <img
          src="/logo.png"
          alt="Логотип MEGA BETON"
          class="h-20 w-auto scale-160 transition-transform duration-300 object-contain hover:scale-180"
        >
      </RouterLink>

      <!-- Навигация (desktop) -->
      <div class="flex flex-col w-[80%]">
        <!-- Контакты (desktop только) -->
        <div class="mb-2 pb-2 border-b border-concrete hidden lg:block">
          <ul class="text-sm flex justify-between">
            <li>РК, г. Алматы, Улица Казыбаева, 262</li>
            <a href="tel:+77751442023">
              <li class="flex items-center">
                <div class="i-mdi:phone text-main mr-2" />+7 775 144 20 23
              </li>
            </a>
            <li><a href="mailto:megabeton@mail.ru" class="transition-all hover:underline">megabeton@mail.ru</a></li>
          </ul>
        </div>

        <!-- Ссылки (desktop) -->
        <nav class="text-base gap-10 hidden justify-end md:flex">
          <RouterLink
            v-for="link in links"
            :key="link.href"
            :to="link.href"
            class="transition-all duration-300 relative hover:text-main after:bg-main after:h-0.5 after:w-0 after:content-[''] after:transition-all after:duration-300 after:left-0 after:absolute hover:after:w-full after:-bottom-1"
            :class="route.path === link.href ? 'text-main font-medium after:w-full' : ''"
          >
            {{ link.label }}
          </RouterLink>
        </nav>
      </div>

      <!-- Кнопка бургера (mobile) -->
      <button
        class="text-2xl transition-transform focus:outline-none md:hidden"
        aria-label="Открыть меню"
        @click="isOpen = !isOpen"
      >
        <div class="i-mdi:menu" />
      </button>
    </div>

    <!-- Мобильное меню -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav
        v-show="isOpen"
        class="text-base mx-auto px-4 pb-4 pt-2 border-t border-concrete bg-white/95 flex flex-col gap-2 backdrop-blur-sm container md:hidden"
        aria-label="Мобильная навигация"
      >
        <RouterLink
          v-for="link in links"
          :key="link.href"
          :to="link.href"
          class="transition hover:text-main"
          @click="isOpen = false"
        >
          {{ link.label }}
        </RouterLink>

        <!-- Контакты (mobile) -->
        <div class="text-sm text-gray-700 mt-4 pt-3 border-t border-concrete">
          <div>РК, г. Алматы, Улица Казыбаева, 262</div>
          <a href="tel:+77751442023" class="mt-1 flex items-center">
            <div class="i-mdi:phone text-main mr-2" />+7 775 144 20 23
          </a>
          <div class="mt-1">
            megabeton@mail.ru
          </div>
        </div>
      </nav>
    </transition>
  </header>
</template>
