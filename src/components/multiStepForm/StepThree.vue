<template>
  <div class="w-full bg-white p-6 md:p-4 m-4">
    <h2 class="text-2xl font-bold text-blue-500 mb-6">Dirección</h2>

    <h3 class="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-2 pt-2 mb-6">
      Dirección de Residencia
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 pt-4">
      <div class="md:col-span-2">
        <BaseInput
          name="address"
          label="Dirección residencia"
          placeholder="Ej: Carrera 42 #3 Sur 81"
        />
      </div>

      <BaseInput name="zip" label="Código postal" type="text" placeholder="Ej: 050021" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '@/components/ui/BaseInput.vue'
</script>
