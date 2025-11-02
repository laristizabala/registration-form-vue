<template>
  <div class="container m-4 p-4">
    <Stepper :currentStep="currentStep" />

    <form
      @submit.prevent="handleNext"
      class="w-full bg-white border border-indigo-200 rounded-lg shadow-lg p-6 md:p-8 m-4"
    >
      <step-one v-if="currentStep === 1" />
      <step-two v-if="currentStep === 2" />
      <step-three v-if="currentStep === 3" />
      <hr class="border-gray-300" />
      <data-summary v-if="currentStep === 3" />

      <div class="mt-8 pt-4 flex justify-between">
        <button
          type="button"
          @click="registrationStore.prevStep()"
          v-if="currentStep > 1"
          class="rounded-md bg-gray-300 hover:bg-indigo-100 px-4 py-2 cursor-pointer"
        >
          Atrás
        </button>

        <button
          type="submit"
          class="rounded-md bg-indigo-600 hover:bg-indigo-900 px-4 py-2 text-white ml-auto cursor-pointer"
        >
          {{ currentStep === 3 ? 'Enviar' : 'Siguiente' }}
        </button>
      </div>
    </form>

    <SuccessModal :open="showModal" :title="'Envío exitoso'" @close="showModal = false" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import useRegistrationFormStore from '@/store/registrationStore'
import {
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
  RegisterSchema,
  type RegisterForm,
} from '@/schemas'

import Stepper from '@/components/StepperComponent.vue'
import stepOne from '@/components/multiStepForm/StepOne.vue'
import stepTwo from '@/components/multiStepForm/StepTwo.vue'
import stepThree from '@/components/multiStepForm/StepThree.vue'
import DataSummary from '@/components/DataSummary.vue'
import SuccessModal from '@/components/ui/BaseModal.vue'

const registrationStore = useRegistrationFormStore()

const { registerData, currentStep } = storeToRefs(registrationStore)

const showModal = ref(false)

const currentSchema = computed(() => {
  if (currentStep.value === 1) return toTypedSchema(stepOneSchema)
  if (currentStep.value === 2) return toTypedSchema(stepTwoSchema)
  return toTypedSchema(stepThreeSchema)
})

const { values, validate, setErrors, setFieldTouched, errors } = useForm<RegisterForm>({
  validationSchema: currentSchema,
  initialValues: registerData.value,
  keepValuesOnUnmount: true,
})

watch(
  values,
  (newValues) => {
    registrationStore.updateData(newValues as Partial<RegisterForm>)
  },
  { deep: true },
)

const handleNext = async () => {
  const { valid } = await validate()

  if (!valid) {
    // Mark fields as touched to show errors
    for (const key in errors.value) {
      setFieldTouched(key as keyof RegisterForm, true)
    }
    return
  }

  if (currentStep.value === 3) {
    await handleSubmit()
  } else {
    registrationStore.nextStep()
  }
}

const printMessage = () => {
  console.log('=== FORMULARIO ENVIADO ===')
  // Step 1
  console.log('  • País:', registerData.value.country)
  console.log('  • Género:', registerData.value.gender)
  console.log('  • Nombres:', registerData.value.firstName)
  console.log('  • Apellidos:', registerData.value.lastName)
  console.log('  • Fecha de nacimiento:', registerData.value.birthDate)
  console.log('  • Tipo de documento:', registerData.value.docType)
  console.log('  • Número de documento:', registerData.value.docNumber)
  console.log('  • Foto documento frente:', registerData.value.docFront?.name || 'No seleccionado')
  console.log('  • Foto documento reverso:', registerData.value.docBack?.name || 'No seleccionado')

  // Step 2
  console.log('  • Correo electrónico:', registerData.value.email)
  console.log('  • Contraseña:', '***' + registerData.value.password.slice(-2)) // Solo mostrar últimos 2 caracteres por seguridad
  console.log('  • Confirmación contraseña:', '***' + registerData.value.confirmPassword.slice(-2))
  console.log('  • Número teléfono:', registerData.value.phone)
  console.log('  • Número celular:', registerData.value.mobile)

  // Step 3
  console.log('  • Dirección residencia:', registerData.value.address)
  console.log('  • Código postal:', registerData.value.zip)
  console.log('=====================================')
}

const handleSubmit = async () => {
  const result = RegisterSchema.safeParse(registerData.value)
  printMessage()
  showModal.value = true
  if (!result.success) {
    const zodErrors = result.error.flatten().fieldErrors
    setErrors(zodErrors as Record<string, string>)
    return
  }

  // registrationStore.resetForm();
}
</script>
