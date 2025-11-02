import { defineStore } from 'pinia';
import type { RegisterForm } from '@/schemas';

const initialValues: RegisterForm = {
    country: '',
    gender: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    docType: '',
    docNumber: '',
    docFront: null,
    docBack: null,
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    mobile: '',
    address: '',
    zip: '',
};

const useRegistrationFormStore = defineStore('registrationForm', {
    state: () => ({
        registerData: <RegisterForm>(initialValues),
        currentStep: 1,
    }),

    actions: {
        nextStep() {
            if (this.currentStep < 3) this.currentStep++;
        },
        prevStep() {
            if (this.currentStep > 1) this.currentStep--;
        },
        updateData(payload: Partial<RegisterForm>) {
            this.registerData = { ...this.registerData, ...payload };
        },
        resetForm() {
            this.registerData = { ...initialValues };
            this.currentStep = 1;
        }
    }
})

export default useRegistrationFormStore;