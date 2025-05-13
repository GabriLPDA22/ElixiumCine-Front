// src/services/api.ts
import axios from 'axios'

// Create a base axios instance with common configuration
export const apiClient = axios.create({
  baseURL: 'http://localhost:5006/api', // Update with your backend URL
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  timeout: 10000 // 10 seconds timeout
})

// Add a request interceptor for JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor to handle common error cases
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle 401 Unauthorized errors (expired token, etc)
    if (error.response && error.response.status === 401) {
      // Clear local storage
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')

      // Redirect to login page if not already there
      if (window.location.pathname !== '/auth/login') {
        window.location.href = '/auth/login'
      }
    }

    // Handle 500 Server errors
    if (error.response && error.response.status === 500) {
      console.error('Server error occurred:', error.response.data)
    }

    return Promise.reject(error)
  }
)

export default apiClient
