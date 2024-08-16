<script setup lang="ts">
import { useComments } from "~/components/kanban/slideover/useComments";
import { useCreateComment } from "~/components/kanban/slideover/useCreateComment";
import type { IDeal } from "~/types/deals.types";
import dayjs from "dayjs";

const { data, refetch, isLoading } = useComments();
const { commentRef, createComment } = useCreateComment({ refetch });
const card = data as unknown as IDeal;
</script>

<template>
  <div>
    <UInput
      placeholder="Add comment"
      v-model="commentRef"
      @keyup.enter="createComment"
    />
    <UiSkeleton v-if="isLoading" class="w-full h-[76px] rounded mt-5" />
    <div v-else-if="card">
      <div
        v-for="comment in card.comments"
        :key="comment.$id"
        class="flex items-start mt-5"
      >
        <Icon name="radix-icons:chat-bubble" class="mr-3 mt-1" size="20" />
        <div class="border-border rounded p-3 w-full">
          <div class="mb-2 text-sm">
            Comment {{ dayjs(comment.$createdAt).format("HH:mm") }}
          </div>
          <p>{{ comment.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
