import './assets/main.css'

import { createApp } from 'vue';
import App from './app.vue'; // Asegúrate de que esta ruta sea correcta
import router from './router'; // Archivo router.ts donde definiste las rutas

// Crear la instancia de la aplicación
const app = createApp(App);

// Usar el router en la aplicación
app.use(router);

// Montar la aplicación en el elemento HTML con id "app"
app.mount('#app');