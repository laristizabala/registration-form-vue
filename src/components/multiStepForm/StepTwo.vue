<template>
  <div class="w-full bg-white p-6 md:p-4 m-4">
    <h2 class="text-2xl font-bold text-blue-500 mb-6">Información de Contacto</h2>

    <h3 class="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-2 pt-2 mb-6">
      Datos de Contacto y Cuenta
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 pt-4">
      <div class="md:col-span-2">
        <BaseInput
          name="email"
          label="Correo electrónico"
          type="email"
          placeholder="tu@correo.com"
        />
      </div>

      <BaseInput
        name="password"
        label="Contraseña"
        type="password"
        placeholder="Crea una contraseña segura"
      />

      <BaseInput
        name="confirmPassword"
        label="Confirmar contraseña"
        type="password"
        placeholder="Repite tu contraseña"
      />

      <BaseInput name="phone" label="Numero teléfono" type="tel" placeholder="Ej: 6041234567" />

      <BaseInput name="mobile" label="Numero celular" type="tel" placeholder="Ej: 3101234567" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '@/components/ui/BaseInput.vue'
</script>
