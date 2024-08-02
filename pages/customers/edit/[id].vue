<script setup lang="ts">
import type {ICustomer} from "~/types/deals.types";
import {useMutation, useQuery} from "@tanstack/vue-query";
import {DB} from "~/lib/appwrite";
import {COLLECTION_CUSTOMERS, DB_ID} from "~/app.constants";
import {toTypedSchema} from "@vee-validate/zod";
import {z} from "zod";
import type {PublicPathState} from "vee-validate";

interface ICustomerFormState extends Pick<ICustomer, 'email' | 'name' | 'from_source'> {
}

useSeoMeta({
  title: 'Edit customer'
})

const route = useRoute()
const customerId = route.params.id as string

const {handleSubmit, defineField, setValues, values} = useForm<ICustomerFormState>({
  validationSchema: toTypedSchema(z.object({
    name: z.string().max(40),
    email: z.string().max(40),
    from_source: z.string().max(40),
  })),
})
const {data, isSuccess} = useQuery({
  queryKey: ['get customer', customerId],
  queryFn: () => DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, customerId),
})

watch(data, (newData) => {
  const initialData = newData as unknown as ICustomerFormState
  setValues({
    email: initialData.email,
    from_source: initialData.from_source || '',
    name: initialData.name,
  })
})

const fieldConfig = {
  props: (state: PublicPathState<string>) => ({
    errors: state.errors
  })
}

const [name, nameAttrs] = defineField('name', fieldConfig)
const [email, emailAttrs] = defineField('email', fieldConfig)
const [fromSource, fromSourceAttrs] = defineField('from_source', fieldConfig)

const {mutate, isPending} = useMutation({
  mutationKey: ['update customer', customerId],
  mutationFn: (data: ICustomerFormState) => DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, customerId, data)
})

const onSubmit = handleSubmit((values) => {
  mutate(values)
})

</script>

<template>
  <div class="md:w-1/2 mx-auto">
    <h1 class="font-bold text-2xl mb-10 text-center">
      Edit customer {{ (data as unknown as ICustomerFormState)?.name }}
    </h1>
    <form @submit="onSubmit">
      <UiInput
          v-model="name"
          v-bind="nameAttrs"
          placeholder="Name"
          type="text"
          class="my-1"
      />
      <UiInput
          v-model="email"
          v-bind="emailAttrs"
          placeholder="Email"
          type="text"
          class="my-1"
      />
      <UiInput
          v-model="fromSource"
          v-bind="fromSourceAttrs"
          placeholder="Source"
          type="text"
          class="my-1"
      />
      <UiButton variant="outline" @click="onSubmit" class="my-1" :disable="isPending" type="submit">
        {{ isPending ? 'Loading...' : 'Update' }}
      </UiButton>
    </form>
  </div>
</template>

<style scoped>

</style>