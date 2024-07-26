<script setup lang="ts">
const logoWidth = 50;
</script>

<template>
  <aside>
    <NuxtLink to="/">
      <NuxtImg
          src="/logo.svg"
          alt="logo"
          :placeholder="[logoWidth, logoWidth]"
          :width="logoWidth"
      />
    </NuxtLink>
  </aside>
</template>

<style scoped>

</style>