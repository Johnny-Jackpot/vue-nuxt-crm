<script setup lang="ts">
import type {HTMLAttributes, InputHTMLAttributes} from 'vue'
import {useVModel} from '@vueuse/core'
import {cn} from '@/lib/utils'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
  placeholder?: InputHTMLAttributes['placeholder']
  type?: InputHTMLAttributes['type'],
  errors?: string[],
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input
      v-model="modelValue"
      :placeholder="props.placeholder"
      :type="props.type"
      :class="[cn(
        `flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1
        text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm
        file:font-medium placeholder:text-muted-foreground focus-visible:outline-none
        focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed
        disabled:opacity-50`,
        props.class,
      ), {'border-red-600': props.errors && props.errors.length}]"
  >
  <span v-for="error in props.errors" class="text-xs text-red-600">{{ error }}</span>
</template>
