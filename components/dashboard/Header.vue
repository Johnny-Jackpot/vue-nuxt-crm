<script setup lang="ts">
import ConfirmModal from "~/components/ui/ConfirmModal.vue";

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

const onConfirm = () => {
  alert(1);
};
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
    <ConfirmModal
      v-model="isOpen"
      :button-color="buttonColor"
      @confirm="onConfirm"
    >
      <span v-if="modalType === ModalType.LoadData">
        Confirm test data loading
      </span>
      <span v-if="modalType === ModalType.ClearData">
        Confirm deals and customers deleting
      </span>
    </ConfirmModal>
  </section>
</template>

<style scoped></style>
