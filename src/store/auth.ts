// src/store/auth.ts
import { defineStore } from 'pinia'
import type { User, LoginCredentials, RegisterCredentials } from '@/types/User'
import authService from '@/services/authService'
import router from '@/router'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: authService.getUser(),
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated(): boolean {
      return !!this.user
    }
  },

  actions: {
    /**
     * Login user
     */
    async login(credentials: LoginCredentials) {
      this.loading = true
      this.error = null

      try {
        const response = await authService.login(credentials)

        // Save user to local storage
        authService.setUser(response.data)

        // Update state
        this.user = {
          nombre: response.data.nombre,
          correo: credentials.correo,
          token: response.data.token
        }

        // Redirect to home page after login
        router.push('/')

        return true
      } catch (error: any) {
        this.error = error.response?.data?.mensaje || 'Error al iniciar sesión'
        console.error(error)
        return false
      } finally {
        this.loading = false
      }
    },

    /**
     * Register user
     */
    async register(userData: RegisterCredentials) {
      this.loading = true
      this.error = null

      try {
        const response = await authService.register(userData)

        // If registration is successful, redirect to login
        if (response.status === 200) {
          router.push('/auth/login')
        }

        return true
      } catch (error: any) {
        this.error = error.response?.data?.mensaje || 'Error al registrar usuario'
        console.error(error)
        return false
      } finally {
        this.loading = false
      }
    },

    /**
     * Logout user
     */
    logout() {
      authService.logout()
      this.user = null
      router.push('/auth/login')
    },

    /**
     * Check if user is authenticated
     */
    checkAuth() {
      const user = authService.getUser()
      this.user = user
      return !!user
    }
  }
})
