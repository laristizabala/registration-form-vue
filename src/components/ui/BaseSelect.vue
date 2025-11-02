<template>
  <div class="flex flex-col space-y-1">
    <label v-if="label" :for="id || name" class="text-sm font-medium text-gray-400">
      {{ label }}
      <span v-if="required" class="text-feedback-error ml-1">*</span>
    </label>

    <div class="relative">
      <select
        :id="id || name"
        :name="name"
        v-model="value"
        :disabled="disabled"
        :required="required"
        @blur="handleBlur"
        class="w-full rounded-xl border px-3 py-2 pr-10 outline-none transition border-gray-300 focus:ring-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
        :class="inputClasses"
      >
        <option v-if="placeholder" value="" disabled>
          {{ placeholder }}
        </option>

        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <div
        v-if="meta.touched"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <IconChek v-if="meta.valid" class="h-5 w-5 mr-5 text-green-500" />
        <IconExclamation v-if="!!errorMessage" class="h-5 w-5 mr-5 text-rose-600" />
      </div>
    </div>

    <p v-if="errorMessage" class="text-sm text-rose-600">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useField } from 'vee-validate'
import IconChek from '@/components/icons/IconCheck.vue'
import IconExclamation from '@/components/icons/IconExclamation.vue'

interface Option {
  value: string | number
  label: string
}

interface Props {
  id?: string
  name: string
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  options: Option[]
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Selecciona una opción',
  disabled: false,
  required: false,
  id: undefined,
  label: '',
})

const { value, errorMessage, handleBlur, meta } = useField<string | number>(() => props.name)

const valid = computed(() => meta.touched && meta.valid)

const inputClasses = computed(() => [
  'w-full rounded-xl border px-3 py-2 outline-none transition',
  'border-gray-300 focus:ring-2 focus:ring-indigo-500',
  'disabled:opacity-60 disabled:cursor-not-allowed',
  !!errorMessage.value ? 'border-rose-500 focus:ring-rose-200 ring-offset-2' : '',
  valid.value ? 'border-green-500 focus:ring-green-500' : '',
])
</script>
