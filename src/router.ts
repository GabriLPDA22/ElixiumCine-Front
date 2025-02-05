import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './components/views/HomeView.vue';
import Cinemas from './components/views/CinemaList.vue';
import GranCasa from './components/views/GranCasa.vue';
import PuertoVenecia from './components/views/PuertoVenecia.vue';
import TorreOutlet from './components/views/TorreOutlet.vue';
import Palafox from './components/views/Palafox.vue';
import Login from './components/Security/LoginView.vue'
import path from 'path';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
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
  {
    path: '/Login',
    name: 'Login',
    component: Login,
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;