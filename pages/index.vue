<script setup lang="ts">
import type {ICard, IColumn} from "~/components/kanban/kanban.types";
import {useKanbanQuery} from "~/components/kanban/useKanbanQuery";
import {convertCurrency} from "~/lib/convertCurrency";
import dayjs from "dayjs";
import type {EnumStatus} from "~/types/deals.types";
import {useMutation} from "@tanstack/vue-query";
import {DB} from "~/lib/appwrite";
import {COLLECTION_DEALS, DB_ID} from "~/app.constants";

useHead({
  title: 'Home | Vue CRM',
});

const dragCardRef = ref<ICard | null>(null)
const sourceColumnRef = ref<IColumn | null>(null)
const {data, isLoading, refetch} = useKanbanQuery()

type TypeMutationVariables = {
  docId: string,
  status?: EnumStatus,
}

const {mutate} = useMutation({
  mutationKey: ['move card'],
  mutationFn: ({docId, status}: TypeMutationVariables) => DB.updateDocument(
      DB_ID,
      COLLECTION_DEALS,
      docId,
      {status}
  ),
  onSuccess: () => {
    refetch()
  }
})

function handleDragStart(card: ICard, column: IColumn) {
  dragCardRef.value = card
  sourceColumnRef.value = column
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
}

function handleDrop(targetColumn: IColumn) {
  if (dragCardRef.value && sourceColumnRef.value) {
    mutate({docId: dragCardRef.value.id, status: targetColumn.id});
  }
}

</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">Vue CRM</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="grid grid-cols-5 gap-16">
        <div
            v-for="(column, index) in data"
            :key="column.id"
            @dragover="handleDragOver"
            @drop="handleDrop(column)"
        >
          <div class="rounded py-1 px-5 mb-2 text-center bg-slate-500 text-white">{{ column.name }}</div>
          <div>
            <KanbanCreateDeal @dealCreated="refetch" :status="column.id"/>
            <UiCard
                v-for="card in column.items"
                :key="card.id"
                class="mb-3"
                draggable="true"
                @dragstart="handleDragStart(card, column)"
            >
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