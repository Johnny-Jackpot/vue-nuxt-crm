<script setup lang="ts">
import {MENU_DATA} from "./menu.data";
</script>

<template>
  <div>
    <NuxtLink
        v-for="item in MENU_DATA"
        class="flex items-center py-1 px-3 w-full mb-2 transition-all hover:text-active menu-link"
        :key="item.name"
        :to="item.url"
    >
      <Icon :name="item.icon" class="mr-3"/>
      <span>{{ item.name }}</span>
    </NuxtLink>
  </div>
</template>

<style scoped>
.menu-link:last-child {
  @apply border-t-2;
}
</style>