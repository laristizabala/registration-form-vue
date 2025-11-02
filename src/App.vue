<template>
  <main class="flex flex-col font-bold">
    <h1 class="text-center text-5xl text-blue-500">Registro</h1>
    <p class="m-2 p-2 font-semibold text-lg text-center text-gray-500">
      Por favor ingresar todos los datos para realizar el registro.
    </p>
    <RegistrationView />
  </main>
</template>
<script setup lang="ts">
import RegistrationView from './views/RegistrationView.vue'
</script>
