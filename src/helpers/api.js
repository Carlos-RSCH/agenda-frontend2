// src/helpers/api.js
import { useAuthStore } from '../stores/auth'
import router from '../router'

const API_BASE = 'https://backend-grupo03-agendacontactos.liveblog365.com/api'

export async function apiFetch(endpoint, options = {}) {
  const auth = useAuthStore()

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  }

  // Agregar token si existe
  if (auth.token) {
    headers['Authorization'] = `Bearer ${auth.token}`
  }

  let response

  try {
    response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    })
  } catch (err) {
    return {
      ok: false,
      message: 'No se pudo conectar con el servidor.'
    }
  }

  let data = {}
  try {
    data = await response.json()
  } catch (err) {
    data = {}
  }

  // Si el token expiró o no es válido
  if (response.status === 401) {
    auth.clearAuth()
    router.push('/login')
    return { ok: false, message: 'Sesión expirada. Inicia sesión nuevamente.' }
  }

  // Forzar formato uniforme
  return {
    ok: data.ok ?? response.ok,
    data: data.data ?? null,
    message: data.message ?? null
  }
}
