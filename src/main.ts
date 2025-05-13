// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Crear la instancia de la aplicación
const app = createApp(App)

// Configurar Pinia
const pinia = createPinia()
app.use(pinia)

// Configurar Router
app.use(router)

// Montar la aplicación
app.mount('#app')
