import { createApp } from 'vue';
import App from './app.vue'; // Asegúrate de que esta ruta sea correcta
import router from './router'; // Archivo router.ts donde definiste las rutas
import { createPinia } from 'pinia';

// Crear la instancia de la aplicación
const app = createApp(App);
const pinia = createPinia();

// Usar el router en la aplicación
app.use(router);
app.use(pinia);

// Montar la aplicación en el elemento HTML con id "app"
app.mount('#app');