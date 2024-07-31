<script setup lang="ts">
import type {ICard, IColumn} from "~/components/kanban/kanban.types";
import {useKanbanQuery} from "~/components/kanban/useKanbanQuery";
import {convertCurrency} from "~/lib/convertCurrency";
import dayjs from "dayjs";

useHead({
  title: 'Home | Vue CRM',
});

const dragCardRef = ref<ICard | null>(null)
const sourceColumnRed = ref<IColumn | null>(null)
const {data, isLoading, refetch} = useKanbanQuery()

</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">Vue CRM</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="grid grid-cols-5 gap-16">
        <div v-for="(column, index) in data" :key="column.id">
          <div class="rounded py-1 px-5 mb-2 text-center bg-slate-500 text-white">{{ column.name }}</div>
          <div>
            <KanbanCreateDeal @dealCreated="refetch" :status="column.id" />
            <UiCard v-for="card in column.items" :key="card.id" class="mb-3" draggable="true">
              <UiCardHeader role="button">
                {{ card.name }}
                <UiCardTitle></UiCardTitle>
                <UiCardDescription>{{ convertCurrency(card.price) }}</UiCardDescription>
              </UiCardHeader>
              <UiCardContent class="text-sm">Company: {{ card.companyName }}</UiCardContent>
              <UiCardFooter>{{ dayjs(card.$createdAt).format('DD MMMM YYYY') }}</UiCardFooter>
            </UiCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>