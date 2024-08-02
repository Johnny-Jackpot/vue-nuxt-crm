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

watchEffect(() => {
  const initialData = data as unknown as ICustomerFormState
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

const [name, nameAttr] = defineField('name', fieldConfig)
const [email, emailAttr] = defineField('email', fieldConfig)
const [fromSource, fromSourceAttr] = defineField('from_source', fieldConfig)

const {mutate, isPending} = useMutation({
  mutationKey: ['update customer', customerId],
  mutationFn: (data: ICustomerFormState) => DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, customerId, data)
})

const unSubmit = handleSubmit((values) => {
  mutate(values)
})

</script>

<template>

</template>

<style scoped>

</style>