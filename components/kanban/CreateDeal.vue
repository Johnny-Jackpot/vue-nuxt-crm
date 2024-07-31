<script setup lang="ts">
import {useMutation} from "@tanstack/vue-query";
import {v4 as uuid} from 'uuid';
import {COLLECTION_DEALS, DB_ID} from "~/app.constants";
import type {IDeal} from "~/types/deals.types";

const open = ref<boolean>(false)

interface IDealFormState extends Pick<IDeal, 'name'|'price'> {
  customer: {
    email: string
    name: string
  }
  status: string
}

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
})

</script>

<template>
<div class="text-center mb-2">
  <button class="transition-all opacity-5 hover:opacity-100 hover:text-active" @click="open = !open">
    <Icon v-if="open" name="radix-icons:arrow-up" class="fade-in-100 fade-out-0"/>
    <Icon v-else name="radix-icons:plus-circled" class="fade-in-100 fade-out-0"/>
  </button>
  <form>

  </form>
</div>
</template>

<style scoped>

</style>