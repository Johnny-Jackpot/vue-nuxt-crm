<script setup lang="ts">
import {useDealSlideStore} from "~/store/deal-slide.store";

const dealSlideStore = useDealSlideStore()
</script>

<template>
  <USlideover :model-value="dealSlideStore.isOpen" @update:modelValue="dealSlideStore.isOpen = $event">
    <UCard
        class="flex flex-col flex-1 overflow-y-auto"
        :ui="{
          body: {base: 'flex-1'},
          ring: '',
          divide: 'divide-y divide-border'
        }"
    >
      <template #header>
        <KanbanSlideoverTop />
      </template>
      <KanbanSlideoverComments />
    </UCard>
  </USlideover>
</template>

<style scoped>

</style>