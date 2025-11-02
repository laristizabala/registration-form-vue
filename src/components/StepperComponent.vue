<template>
  <div class="min-h-30 flex items-center justify-center p-4">
    <div class="w-full max-w-md lg:max-w-6xl text-center">
      <div class="relative mb-8">
        <div
          class="absolute inset-x-0 top-1/3 transform -translate-y-1/2 h-1 lg:h-1.5 bg-gray-300 rounded z-0"
        ></div>

        <div
          class="absolute left-0 top-1/3 transform -translate-y-1/2 h-1 lg:h-1.5 bg-indigo-600 rounded z-10 transition-all duration-300"
          :style="{ width: progressWidth }"
        ></div>

        <div class="flex justify-between items-center relative z-20">
          <div v-for="(circle, idx) in items" :key="circle.id" class="flex flex-col items-center">
            <div
              :class="[
                'relative flex items-center justify-center rounded-full w-10 h-10 lg:w-12 lg:h-12 border-2 transition-transform duration-200',
                isActive(idx)
                  ? 'bg-white text-indigo-600 border-indigo-600 scale-110'
                  : 'bg-gray-200 text-gray-400 border-gray-200',
              ]"
            >
              <span class="font-semibold text-sm lg:text-base">{{ circle.id }}</span>
            </div>
            <div class="mt-2 text-sm lg:text-base font-semibold text-gray-700">
              {{ circle.caption }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'

type Circle = { id: number; caption: string }

const props = defineProps<{
  currentStep?: number
  circles?: Circle[]
}>()

const emit = defineEmits<{
  (e: 'update:currentStep', value: number): void
}>()

const defaultCircles: Circle[] = [
  { id: 1, caption: 'Información Personal' },
  { id: 2, caption: 'Información de Contacto' },
  { id: 3, caption: 'Dirección' },
]

const internalActive = ref<number>(1)

const items = props.circles ?? defaultCircles

const currentActive = computed<number>({
  get() {
    const raw = props.currentStep ?? internalActive.value
    return Math.min(Math.max(1, Math.floor(raw)), items.length)
  },
  set(v: number) {
    const clamped = Math.min(Math.max(1, Math.floor(v)), items.length)
    if (props.currentStep === undefined) {
      internalActive.value = clamped
    } else {
      emit('update:currentStep', clamped)
    }
  },
})

const isActive = (index: number): boolean => index < currentActive.value

const progressWidth = computed(() => {
  if (items.length <= 1) return '0%'
  return (((currentActive.value - 1) / (items.length - 1)) * 100).toFixed(2) + '%'
})
</script>
