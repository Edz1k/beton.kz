<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

interface Props {
  delay?: number
  duration?: number
  distance?: number
  threshold?: number
  once?: boolean
  tag?: string
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0,
  duration: 700,
  distance: 24,
  threshold: 0.15,
  once: true,
  tag: 'div',
})

const root = ref<HTMLElement | null>(null)
const isVisible = ref(false)

let observer: IntersectionObserver | null = null

const style = computed(() => {
  return {
    transitionDuration: `${props.duration}ms`,
    transitionDelay: `${props.delay}ms`,
    transform: isVisible.value
      ? 'translate3d(0, 0, 0)'
      : `translate3d(0, ${props.distance}px, 0)`,
    opacity: isVisible.value ? '1' : '0',
    willChange: 'transform, opacity',
  }
})

onMounted(() => {
  if (!root.value)
    return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true

        if (props.once && observer) {
          observer.unobserve(entry.target)
          observer.disconnect()
          observer = null
        }
      }
      else if (!props.once) {
        isVisible.value = false
      }
    },
    {
      threshold: props.threshold,
    },
  )

  observer.observe(root.value)
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<template>
  <component
    :is="tag"
    ref="root"
    :style="style"
    class="transition-all ease-out"
  >
    <slot />
  </component>
</template>
