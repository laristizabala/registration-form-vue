# Formulario de Registro Multi-Paso

Este proyecto es una implementación de un formulario de registro de 3 pasos, construido como un reto técnico. La aplicación está desarrollada con **Vue 3 (Composition API)**, **TypeScript**, **Pinia** para la gestión de estado, **VeeValidate v4** + **Zod** para la validación de formularios, y **Tailwind CSS** para los estilos.

## 🔗 Url

- [Registration form Url](https://registration-form-vue.netlify.app/)

```bash
https://registration-form-vue.netlify.app/
```

## 🚀 Instalación y Ejecución

Para descargar y ejecutar el proyecto, sigue los siguientes pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL-del-repositorio>
    cd nombre-del-proyecto
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Correr el proyecto en modo desarrollo:**
    ```bash
    npm run dev
    ```
4.  **Compilación para producción:**
    ```bash
    npm run build
    ```

## Lint con [ESLint](https://eslint.org/)

```bash
npm run lint
```

## IDE Setup Recomendado

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Navegador Recomendado

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## 🚀 Características Principales

- **Formulario Multi-Paso:** El registro está dividido en 3 pasos con navegación de "Siguiente" y "Atrás".
- **Gestión de Estado Centralizada:** El estado del formulario (`registerData`) y el paso actual (`currentStep`) se manejan globalmente con Pinia.
- **Validación por Pasos:** Cada paso se valida individualmente antes de permitir al usuario avanzar.
- **Validación de Campos (On-Blur):** Los mensajes de error y los iconos de validación (✔/❌) aparecen solo después de que el usuario "sale" del campo (`on-blur`), no mientras escribe, para una mejor UX.
- **Validaciones Complejas:**
  - Validación de edad (+18 años) usando un DatePicker.
  - Validación de formato de archivo (solo JPG).
  - Validación de confirmación de contraseña.
- **Carga Asíncrona:** La lista de países se obtiene de una API externa (`restcountries.com`) mediante un composable reutilizable.
- **Componentes Base:** Todos los campos del formulario son componentes base reutilizables (DRY).
- **Modal de Éxito:** Un modal confirma el envío exitoso al finalizar el Paso 3.

---

## 🛠️ Stack Tecnológico y Decisiones Técnicas

La arquitectura de este proyecto fue elegida para ser moderna, escalable y mantenible.

### 1. Vue 3 + TypeScript + `<script setup>`

- **Decisión:** Usar la Composition API con la sintaxis `<script setup>`.
- **Por qué:** Ofrece una sintaxis más limpia y una mejor organización de la lógica (especialmente en componentes complejos). TypeScript proporciona seguridad de tipos indispensable para un formulario con muchos campos, previniendo errores de sincronización entre el estado, los componentes y las validaciones.

### 2. Gestión de Estado: Pinia

- **Decisión:** Usar Pinia para centralizar el estado del formulario (`registerData`) y el paso actual (`currentStep`).
- **Por qué:** Un formulario multi-paso es el caso de uso perfecto para un store global. Evita la necesidad de pasar _props_ y emitir eventos a través de múltiples niveles (prop-drilling). Los componentes `StepOne`, `StepTwo` y `StepThree` leen y escriben en la misma fuente de verdad (`registrationStore`).

### 3. Validación: VeeValidate (v4) + Zod

- **Decisión:** Usar Zod para definir los _esquemas_ de validación y VeeValidate para _ejecutarlos_ y manejar el estado del formulario.
- **Por qué:** Es la combinación más robusta en el ecosistema de Vue:
  - **Zod:** Actúa como la **única fuente de verdad** para nuestras reglas de negocio Y nuestros tipos. Usamos `z.infer` para derivar automáticamente nuestro tipo `RegisterFormData` desde el schema, garantizando que la validación y los tipos nunca se desincronicen.
  - **VeeValidate:** Se encarga de todo el "trabajo sucio" del estado del formulario: `values`, `errors`, `meta` (touched, valid), etc.
  - **Orquestación:** El componente `RegistrationView.vue` actúa como orquestador, inicializando `useForm()` y pasándole dinámicamente el schema del paso actual.

### 4. Arquitectura de Componentes (Atomic Design)

- **Decisión:** Crear una carpeta `/ui` con componentes base reutilizables (`BaseInput`, `BaseSelect`, `BaseDate`, `BaseFile`).
- **Por qué:** Principio DRY (Don't Repeat Yourself). Toda la lógica de validación de VeeValidate (el hook `useField()`), la gestión de errores y los iconos (✔/❌) están encapsulados dentro de estos componentes. Esto hace que los componentes de los pasos (`StepOne.vue`, etc.) sean extremadamente limpios y declarativos (ej. `<BaseInput name="firstName" label="Nombre" />`).

### 5. Configuración de UX de Validación

- **Decisión:** Configurar VeeValidate globalmente en `main.ts` con `validateOnBlur: true` y `validateOnInput: false`.
- **Por qué:** Para evitar la "validación agresiva" (mostrar errores mientras el usuario aún está escribiendo). Los errores y los iconos de éxito/error solo aparecen cuando el usuario abandona el campo, lo cual es una experiencia de usuario mucho más agradable.

---

## 📁 Distribución del Proyecto

La estructura de carpetas está diseñada para separar claramente las responsabilidades:

/src
|-- /components
| |-- /icons #Iconos necesarios para mejora ui
| |-- /ui
| | |-- BaseInput.vue # Componente genérico (maneja label, input, error, iconos)
| | |-- BaseSelect.vue # Componente genérico para selects
| | |-- BaseDate.vue # Wrapper para la librería de datepicker
| | |-- BaseFile.vue # Input de archivo estilizado
| | |-- BaseModal.vue # El modal de éxito (Req 4)
| |-- /multiStepForm
| | |-- StepOne.vue # Formulario del paso 1
| | |-- StepTwo.vue # Formulario del paso 2
| | |-- StepThree.vue # Formulario del paso 3
| |-- StepperComponent.vue # La línea de tiempo visual (Req 2)
|-- /composables
| |-- useCountries.ts # Hook para fetchear y cachear la lista de países
|-- /store
| |-- registrationStore.ts # Store de Pinia (estado centralizado de formulario)
|-- /utils #Funciones adicionales para validación
|-- /schemas
| |-- index.ts # Llamado centralizado a todos los esquemas
| |-- registrationStore.ts # Donde vivirá nuestro esquema Zod y tipos inferidos
|-- App.vue # Contenedor principal
|-- main.ts # Setup de Vue, Pinia, etc.
