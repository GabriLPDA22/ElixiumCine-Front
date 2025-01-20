import { createRouter, createWebHistory } from 'vue-router';
import Home from '../src/components/views/Home.vue';
import Cinemas from './components/views/Cinemas.vue';
import GranCasa from './components/views/GranCasa.vue';
import PuertoVenecia from './components/views/PuertoVenecia.vue';
import TorreOutlet from './components/views/TorreOutlet.vue';
import Palafox from './components/views/Palafox.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/cines',
    name: 'Cinemas',
    component: Cinemas,
  },
  {
    path: '/cines/gran-casa',
    name: 'GranCasa',
    component: GranCasa,
  },
  {
    path: '/cines/puerto-venecia',
    name: 'PuertoVenecia',
    component: PuertoVenecia,
  },
  {
    path: '/cines/torre-outlet',
    name: 'TorreOutlet',
    component: TorreOutlet,
  },
  {
    path: '/cines/palafox',
    name: 'Palafox',
    component: Palafox,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;