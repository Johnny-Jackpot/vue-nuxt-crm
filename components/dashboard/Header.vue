<script setup lang="ts">
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
});

const enum ModalType {
  LoadData = "LoadData",
  ClearData = "ClearData",
}

const isOpen = ref(false);
const modalType = ref<ModalType | null>(null);
const buttonColor = computed(() => {
  return modalType.value === ModalType.ClearData ? "red" : "green";
});

const onConfirm = () => {};
</script>

<template>
  <section>
    <div class="flex justify-between align-middle mb-10">
      <h1 class="font-bold text-2xl">Vue CRM</h1>
      <div class="flex gap-1" v-if="!props.isLoading">
        <UButton
          @click="
            isOpen = !isOpen;
            modalType = ModalType.LoadData;
          "
          >Load test data
        </UButton>
        <UButton
          @click="
            isOpen = !isOpen;
            modalType = ModalType.ClearData;
          "
          color="red"
          >Clear deals and customers
        </UButton>
      </div>
    </div>
    <UModal v-model="isOpen">
      <div class="p-6">
        <h4 class="text-center mb-4">
          <span v-if="modalType === ModalType.LoadData">
            Confirm test data loading
          </span>
          <span v-if="modalType === ModalType.ClearData">
            Confirm deals and customers deleting
          </span>
        </h4>
        <div class="flex align-middle justify-center gap-2">
          <UButton
            size="lg"
            @click="
              onConfirm();
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
  </section>
</template>

<style scoped></style>
