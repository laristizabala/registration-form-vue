<template>
  <teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/50" @click="emit('close')" />
      <div
        class="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        :aria-label="title || 'Diálogo'"
      >
        <div class="bg-white rounded-lg p-8 max-w-md w-full">
          <div class="flex flex-col items-center gap-5">
            <div
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4"
            >
              <IconChek class="h-12 w-12 mr-5 text-green-600" />
            </div>

            <h3 class="text-lg font-medium text-gray-900 mb-2">¡Formulario Enviado con Éxito!</h3>

            <p class="text-sm text-gray-600 mb-6">
              Tu información ha sido enviada correctamente. Te contactaremos pronto.
            </p>

            <button
              @click="emit('close')"
              class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

import IconChek from '../icons/IconCheck.vue'
const props = defineProps<{ open: boolean; title?: string }>()
const emit = defineEmits<{ (e: 'close'): void }>()
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.open) emit('close')
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>
