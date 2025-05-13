// src/services/authService.ts
import apiClient from './api'
import type { User, LoginCredentials, RegisterCredentials } from '@/types/User'

export default {
  /**
   * Login user
   */
  login(credentials: LoginCredentials) {
    return apiClient.post<{ nombre: string; token: string }>('/Auth/login', credentials)
  },

  /**
   * Register user
   */
  register(userData: RegisterCredentials) {
    return apiClient.post<{ mensaje: string }>('/Auth/register', userData)
  },

  /**
   * Store user info in local storage
   */
  setUser(user: { nombre: string; token: string }) {
    localStorage.setItem('usuario', user.nombre)
    localStorage.setItem('token', user.token)
  },

  /**
   * Get current user from local storage
   */
  getUser(): User | null {
    const nombre = localStorage.getItem('usuario')
    const token = localStorage.getItem('token')

    if (!nombre) return null

    return {
      nombre,
      correo: '', // Email not stored in local storage for security
      token
    }
  },

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem('usuario')
    localStorage.removeItem('token')
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
  }
}
