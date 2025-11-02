import './assets/main.css'
import './styles/tailwind.css';

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import { configure } from 'vee-validate'

configure({
    validateOnInput: false,
    validateOnBlur: true,
    validateOnChange: true,
});

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.mount('#app')
