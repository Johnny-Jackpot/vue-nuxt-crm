<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { v4 as uuid } from "uuid";
import { COLLECTION_DEALS, DB_ID } from "~/app.constants";
import type { IDeal } from "~/types/deals.types";
import { DB } from "~/lib/appwrite";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import type { PublicPathState } from "vee-validate";

const open = ref<boolean>(false);

const emit = defineEmits(["dealCreated"]);

interface IDealFormState extends Pick<IDeal, "name" | "price"> {
  customer: {
    email: string;
    name: string;
  };
  status: string;
}

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
});

const { handleSubmit, defineField, handleReset } = useForm<IDealFormState>({
  initialValues: {
    status: props.status,
  },
  validationSchema: toTypedSchema(
    z.object({
      name: z.string().max(44),
      price: z.number().positive().max(100000000),
      customer: z.object({
        email: z.string().email().max(40),
        name: z.string().max(40),
      }),
      status: z.string(),
    }),
  ),
});

const fieldConfig = {
  props: (state: PublicPathState<string>) => ({
    errors: state.errors,
  }),
};

const [name, nameAttrs] = defineField("name", fieldConfig);
const [price, priceAttrs] = defineField("price", fieldConfig);
const [customerEmail, customerEmailAttrs] = defineField(
  "customer.email",
  fieldConfig,
);
const [customerName, customerNameAttrs] = defineField(
  "customer.name",
  fieldConfig,
);

const { mutate, isPending } = useMutation({
  mutationKey: ["create a new deal"],
  mutationFn: (data: IDealFormState) =>
    DB.createDocument(DB_ID, COLLECTION_DEALS, uuid(), data),
  onSuccess() {
    emit("dealCreated");
    handleReset();
  },
});

const onSubmit = handleSubmit((values) => {
  debugger;
  mutate(values);
});
</script>

<template>
  <div class="text-center mb-2">
    <button class="transition-all hover:text-active" @click="open = !open">
      <Icon
        v-if="open"
        name="radix-icons:arrow-up"
        class="fade-in-100 fade-out-0"
      />
      <Icon
        v-else
        name="radix-icons:plus-circled"
        class="fade-in-100 fade-out-0"
      />
    </button>
    <form v-if="open" @submit="onSubmit">
      <UiInput
        v-model="name"
        v-bind="nameAttrs"
        placeholder="Name"
        type="text"
        class="my-1"
      />
      <UiInput
        v-model="price"
        v-bind="priceAttrs"
        placeholder="Price"
        type="number"
        class="my-1"
      />
      <UiInput
        v-model="customerEmail"
        v-bind="customerEmailAttrs"
        placeholder="Customer Email"
        type="email"
        class="my-1"
      />
      <UiInput
        v-model="customerName"
        v-bind="customerNameAttrs"
        placeholder="Customer Name"
        type="text"
        class="my-1"
      />
      <UiButton
        variant="outline"
        @click="onSubmit"
        class="w-full my-1"
        :disable="isPending"
        type="submit"
      >
        {{ isPending ? "Loading..." : "Add" }}
      </UiButton>
      <UiButton
        variant="outline"
        @click="handleReset"
        class="w-full my-1"
        :disable="isPending"
        type="button"
      >
        Reset
      </UiButton>
    </form>
  </div>
</template>

<style scoped></style>
