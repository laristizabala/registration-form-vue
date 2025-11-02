<template>
  <div class="flex flex-col space-y-1">
    <label v-if="label" :for="id || name" class="block text-sm font-medium text-gray-400">
      {{ label }}
    </label>

    <div class="relative">
      <DatePicker
        :id="id || name"
        :name="name"
        v-model:value="value"
        format="YYYY-MM-DD"
        value-type="format"
        :placeholder="placeholder"
        :disabled="disabled"
        :clearable="true"
        @blur="handleBlur"
        :input-class="inputClasses"
        :aria-invalid="invalid ? 'true' : 'false'"
        :aria-describedby="invalid ? (id || name) + '-error' : undefined"
        :disabled-date="disabledFutureDates"
      />
      <div
        v-if="meta.touched"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <IconChek v-if="meta.valid" class="h-5 w-5 mr-5 text-green-500" />
        <IconExclamation v-if="!!errorMessage" class="h-5 w-5 mr-5 text-rose-600" />
      </div>
    </div>

    <p v-if="errorMessage" :id="(id || name) + '-error'" class="text-sm text-rose-600">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useField } from 'vee-validate'

import DatePicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'

import IconChek from '@/components/icons/IconCheck.vue'
import IconExclamation from '@/components/icons/IconExclamation.vue'

interface Props {
  id?: string
  name: string
  label: string
  placeholder?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  placeholder: 'YYYY-MM-DD',
  disabled: false,
})

const { value, errorMessage, handleBlur, meta } = useField<string | null>(() => props.name)

const valid = computed(() => meta.touched && meta.valid)
const invalid = computed(() => meta.touched && !!errorMessage.value)

const inputClasses = computed(() => [
  'w-full rounded-xl border px-3 py-2 outline-none transition',
  'border-gray-300 focus:ring-2 focus:ring-indigo-500',
  'disabled:opacity-60 disabled:cursor-not-allowed',
  !!errorMessage.value ? 'border-rose-500 focus:ring-rose-200 ring-offset-2' : '',
  valid.value ? 'border-green-500 focus:ring-green-500' : '',
])

const disabledFutureDates = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of day to compare only dates
  return date > today;
};
</script>

<style lang="css">
.mx-datepicker {
  width: 100% !important;
}
</style>
