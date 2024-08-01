<script setup lang="ts">
import {useDealSlideStore} from "~/store/deal-slide.store";

const dealSlideStore = useDealSlideStore()
</script>

<template>
<USlideover :model-value="dealSlideStore.isOpen" @update:modelValue="dealSlideStore.isOpen = $event">
Test
</USlideover>
</template>

<style scoped>

</style>