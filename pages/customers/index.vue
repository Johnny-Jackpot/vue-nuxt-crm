<script setup lang="ts">
import {useQuery} from "@tanstack/vue-query";
import {DB} from "~/lib/appwrite";
import {COLLECTION_CUSTOMERS, DB_ID} from "~/app.constants";
import type {ICustomer} from "~/types/deals.types";

useHead({
  title: 'Customers'
})

const {data, isLoading} = useQuery({
  queryKey: ['customers'],
  queryFn: () => DB.listDocuments(DB_ID, COLLECTION_CUSTOMERS)
})

</script>

<template>
  <div>
    <h1 class="font-bold text-2xl mb-10">Clients</h1>
    <div v-if="isLoading">Loading...</div>
    <UiTable v-else>
      <UiTableHeader>
        <UiTableRow>
          <UiTableHead class="w-[200px]">Name</UiTableHead>
          <UiTableHead class="w-[200px]">Email</UiTableHead>
          <UiTableHead>Source</UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <UiTableRow v-for="customer in (data?.documents as unknown as ICustomer[])" :key="customer.$id">
          <UiTableCell class="font-medium">
            <NuxtLink :href="`customers/edit/${customer.$id}`" class="hover:text-active">
              {{ customer.name }}
            </NuxtLink>
          </UiTableCell>
          <UiTableCell>{{customer.email}}</UiTableCell>
          <UiTableCell>{{customer.from_source}}</UiTableCell>
        </UiTableRow>
      </UiTableBody>
    </UiTable>
  </div>
</template>

<style scoped>

</style>