<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    :class="
      cn(
        `rounded-xl bg-card text-card-foreground animation
        border border-transparent transition-colors p-3`,
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>

<style scoped>
@keyframes show {
  from {
    @apply border-active;
    transform: scale(0.5) translateY(-30px);
    opacity: 0.4;
  }

  to {
    @apply border-transparent;
  }
}

.animation {
  animation: show 0.3s ease-in-out;
}
</style>
