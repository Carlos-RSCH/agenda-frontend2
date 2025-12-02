import { defineStore } from 'pinia'

const API_BASE = 'https://backend-grupo03-agendacontactos.liveblog365.com/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    loading: false,
    error: ''
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    setAuthData(token, user) {
      this.token = token
      this.user = user
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    },

    clearAuth() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    async login(username, password) {
      this.loading = true
      this.error = ''

      try {
        const res = await fetch(`${API_BASE}/auth/login.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        })

        const data = await res.json()

        if (!res.ok || !data.ok) {
          throw new Error(data.message || 'Error al iniciar sesión')
        }

        this.setAuthData(data.token, data.user)
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async register(username, password) {
      this.loading = true
      this.error = ''

      try {
        const res = await fetch(`${API_BASE}/auth/registrar.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        })

        const data = await res.json()

        if (!res.ok || !data.ok) {
          throw new Error(data.message || 'Error al registrarse')
        }

        return data
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    }
  }
})
