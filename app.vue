<script setup lang="ts">
useHead({
  titleTemplate: title => title ? `${title} | Vue CRM` : 'Vue CRM',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
