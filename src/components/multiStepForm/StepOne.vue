<template>
  <div class="w-full bg-white p-6 md:p-4 m-4">
    <h2 class="text-2xl font-bold text-blue-500 mb-6">Información Personal</h2>

    <h3 class="text-lg font-bold text-gray-700 border-b border-gray-300 pb-2 pt-2 mb-6">
      Datos Personales
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 pt-4">
      <BaseSelect
        name="country"
        label="País"
        :options="countryOptions"
        :loading="countriesLoading"
        placeholder="Selecciona tu país"
      />

      <BaseSelect
        name="gender"
        label="Género"
        :options="genderOptions"
        placeholder="Selecciona tu género"
      />

      <BaseInput name="firstName" label="Primer Nombre" placeholder="Nombre" />

      <BaseInput name="lastName" label="Segundo Nombre" placeholder="Segundo nombre" />

      <div class="md:col-span-2">
        <BaseDatePicker name="birthDate" label="Fecha de Nacimiento" />
      </div>
    </div>

    <h3 class="text-lg font-bold text-gray-700 border-b border-gray-300 pt-2 pb-2 mb-6">
      Documento de Identidad
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 pt-4">
      <BaseSelect
        name="docType"
        label="Tipo de Documento"
        :options="docTypeOptions"
        placeholder="Selecciona un documento"
      />

      <BaseInput name="docNumber" label="Número de Documento" placeholder="123456789" type="text" />

      <BaseFile name="docFront" label="Foto Documento (Frente)" accept="image/jpeg" />

      <BaseFile name="docBack" label="Foto Documento (Reverso)" accept="image/jpeg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseDatePicker from '@/components/ui/BaseDate.vue'
import BaseFile from '@/components/ui/BaseFile.vue'

import { useCountries } from '@/composables/useCountries'

const { countries: countryOptions, loading: countriesLoading } = useCountries()

const genderOptions = ref([
  { label: 'Femenino', value: 'Femenino' },
  { label: 'Masculino', value: 'Masculino' },
  { label: 'Otro', value: 'Otro' },
])

const docTypeOptions = ref([
  { label: 'Cédula de ciudadanía', value: 'Cédula de ciudadanía' },
  { label: 'Pasaporte', value: 'Pasaporte' },
  { label: 'Cédula de extranjería', value: 'Cédula de extranjería' },
])
</script>
