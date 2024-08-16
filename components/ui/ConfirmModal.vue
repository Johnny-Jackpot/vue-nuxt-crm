<script setup lang="ts">
const props = defineProps({
  buttonColor: {
    type: String,
    default: "green",
  },
});
defineEmits(["confirm"]);
const isOpen = defineModel<boolean>();
</script>

<template>
  <UModal v-model="isOpen">
    <div class="p-6">
      <h4 class="text-center mb-4">
        <slot />
      </h4>
      <div class="flex align-middle justify-center gap-2">
        <UButton
          size="lg"
          @click="
            $emit('confirm');
            isOpen = !isOpen;
          "
          :color="buttonColor"
          >Confirm
        </UButton>
        <UButton
          size="lg"
          variant="outline"
          @click="isOpen = !isOpen"
          :color="buttonColor"
          >Cancel
        </UButton>
      </div>
    </div>
  </UModal>
</template>

<style scoped></style>
