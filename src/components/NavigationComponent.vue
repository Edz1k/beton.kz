<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'NavigationComponent',
})

const links = [
  { label: 'Главная', href: '#hero' },
  { label: 'Услуги', href: '#services' },
  { label: 'Прайс', href: '#pricing' },
  { label: 'Контакты', href: '#contact' },
]

const isOpen = ref(false)
const active = ref('#hero')

// Слушаем hash при переходах
onMounted(() => {
  active.value = window.location.hash || '#hero'

  window.addEventListener('hashchange', () => {
    active.value = window.location.hash
  })
})
</script>

<template>
  <nav class="top-0 sticky z-50">
    <header class="text-textColor border-b border-concrete bg-white/80 shadow-sm transition-shadow left-0 right-0 top-0 fixed z-50 backdrop-blur-xs">
      <div class="mx-auto px-4 flex h-16 items-center justify-between md:px-8 container">
        <!-- Лого -->
        <a href="/" class="flex gap-2 items-center animate-fade-in">
          <img src="/logo.png" alt="Logo" class="h-20 w-auto scale-160 transition-transform duration-300 object-contain hover:scale-180">
        </a>

        <!-- Навигация (desktop) -->
        <nav class="text-base gap-6 hidden md:flex">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            class="transition-all duration-300 relative hover:text-main after:bg-main after:h-0.5 after:w-0 after:content-[''] after:transition-all after:duration-300 after:left-0 after:absolute hover:after:w-full after:-bottom-1"
            :class="active === link.href ? 'text-main font-medium after:w-full' : ''"
          >
            {{ link.label }}
          </a>
        </nav>

        <!-- Мобильное меню кнопка -->
        <button
          class="text-2xl transition-transform focus:outline-none md:hidden"
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
        <div
          v-show="isOpen"
          class="mx-auto px-4 pb-4 pt-2 border-t border-concrete bg-white/95 backdrop-blur-sm container md:hidden"
        >
          <nav class="text-base flex flex-col space-y-2">
            <a
              v-for="link in links"
              :key="link.href"
              :href="link.href"
              class="transition hover:text-main"
              @click="isOpen = false"
            >
              {{ link.label }}
            </a>
          </nav>
        </div>
      </transition>
    </header>
  </nav>
</template>
