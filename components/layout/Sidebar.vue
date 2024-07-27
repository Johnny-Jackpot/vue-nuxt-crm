<script setup lang="ts">
const logoWidth = 50;
</script>

<template>
  <aside class="px-5 py-8 relative h-full w-full">
    <NuxtLink to="/" class="block mb-10 mx-auto w-fit">
      <NuxtImg
          src="/logo.svg"
          alt="logo"
          :placeholder="[logoWidth, logoWidth]"
          :width="logoWidth"
      />
    </NuxtLink>
    <button class="absolute top-2 right-3 transition-colors hover:text-emerald-500 ">
      <Icon name="line-md:logout" />
    </button>
  </aside>
</template>

<style scoped>

</style>