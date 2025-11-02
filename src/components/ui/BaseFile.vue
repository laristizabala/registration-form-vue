<template>
  <div class="space-y-1">
    <label :for="id || name" class="block text-sm font-medium text-gray-400">{{ label }}</label>
    <div class="relative">
      <input
        :id="id || name"
        :name="name"
        type="file"
        :accept="accept"
        :disabled="disabled"
        class="w-full rounded-xl border px-3 py-2 pr-10 outline-none transition border-gray-300 file:mr-2 file:rounded-lg file:border file:px-3 file:py-1 focus:ring-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
        :class="inputClasses"
        :aria-invalid="invalid ? 'true' : 'false'"
        :aria-describedby="invalid ? (id || name) + '-error' : undefined"
        @change="handleChange"
        @blur="handleBlur"
      />
      <div
        v-if="meta.touched"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <IconCheck v-if="meta.valid" class="h-5 w-5 mr-3 text-green-500" />
        <IconExclamation v-if="!!errorMessage" class="h-5 w-5 mr-3 text-rose-600" />
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
import IconCheck from '@/components/icons/IconCheck.vue'
import IconExclamation from '@/components/icons/IconExclamation.vue'

const props = withDefaults(
  defineProps<{
    id?: string
    name: string
    label: string
    accept?: string
    disabled?: boolean
  }>(),
  {
    accept: 'image/jpeg',
    disabled: false,
    id: undefined,
  },
)

const { errorMessage, handleBlur, handleChange, meta } = useField<File | null>(() => props.name)

const valid = computed(() => meta.touched && meta.valid)
const invalid = computed(() => meta.touched && !!errorMessage.value)

const inputClasses = computed(() => [
  'w-full rounded-xl border px-3 py-2 outline-none transition',
  'border-gray-300 focus:ring-2 focus:ring-indigo-500',
  'disabled:opacity-60 disabled:cursor-not-allowed',
  !!errorMessage.value ? 'border-rose-500 focus:ring-rose-200 ring-offset-2' : '',
  valid.value ? 'border-green-500 focus:ring-green-500' : '',
])
</script>
