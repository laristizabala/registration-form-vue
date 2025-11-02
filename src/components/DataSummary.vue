<template>
  <div class="bg-gray-50 p-3 sm:p-4 rounded-md">
    <h2 class="text-2xl font-bold text-blue-500 mb-6 pb-4">Resumen de datos:</h2>
    <div class="text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-2">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
        <p><strong class="font-bold">País:</strong> {{ registerData.country }}</p>
        <p><strong class="font-bold">Género:</strong> {{ registerData.gender }}</p>
        <p><strong class="font-bold">Nombres:</strong> {{ registerData.firstName }}</p>
        <p><strong class="font-bold">Apellidos:</strong> {{ registerData.lastName }}</p>
        <p><strong class="font-bold">Fecha nacimiento:</strong> {{ registerData.birthDate }}</p>
        <p><strong class="font-bold">Tipo documento:</strong> {{ registerData.docType }}</p>
        <p><strong class="font-bold">Número documento:</strong> {{ registerData.docNumber }}</p>
        <p><strong class="font-bold">Correo electrónico:</strong> {{ registerData.email }}</p>
        <p><strong class="font-bold">Número teléfono:</strong> {{ registerData.phone }}</p>
        <p><strong class="font-bold">Número celular:</strong> {{ registerData.mobile }}</p>
        <p><strong class="font-bold">Dirección residencia:</strong> {{ registerData.address }}</p>
        <p><strong class="font-bold">Código postal:</strong> {{ registerData.zip }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useRegistrationFormStore from '@/store/registrationStore'

const registrationStore = useRegistrationFormStore()

const { registerData } = storeToRefs(registrationStore)
</script>

<style scoped></style>
