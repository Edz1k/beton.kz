<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})
const phone = ref('')
</script>

<template>
  <PhoneInput v-model="phone" />
</template>
