import { createRouter, createWebHistory } from 'vue-router';
import Home from '../src/components/views/Home.vue';
import Cinemas from './components/views/Cinemas.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home, // Debe apuntar a Home.vue
  },
  {
    path: '/cines',
    name: 'Cinemas',
    component: Cinemas,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;