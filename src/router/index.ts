// src/router/index.ts (actualizado con nuevas rutas)
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cines',
    name: 'cinemas',
    component: () => import('../views/CinemasView.vue')
  },
  {
    path: '/peliculas',
    name: 'movies',
    component: () => import('../views/MoviesView.vue')
  },
  {
    path: '/promociones',
    name: 'promotions',
    component: () => import('../views/PromotionsView.vue')
  },
  {
    path: '/cookies',
    name: 'cookies',
    component: () => import('../views/CookiesView.vue')
  },
  {
    path: '/productos-bar',
    name: 'products',
    component: () => import('../views/ProductsView.vue')
  },
  // Rutas de autenticación
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('../views/auth/LoginView.vue')
  },
  {
    path: '/auth/register',
    name: 'register',
    component: () => import('../views/auth/RegisterView.vue')
  },
  // Ruta de redirección para 404
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
