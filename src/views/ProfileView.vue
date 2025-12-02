<template>
  <section class="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
    <h2 class="text-2xl font-bold mb-4">Perfil del Usuario</h2>

    <div v-if="loading" class="text-gray-600">Cargando perfil...</div>

    <div v-else>
      <form @submit.prevent="updateProfile" class="space-y-4">

        <div>
          <label class="block font-semibold mb-1">Nombre de Usuario</label>
          <input
            v-model="username"
            class="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Guardar Cambios
        </button>
      </form>

      <p v-if="success" class="text-green-600 mt-4">
        Perfil actualizado correctamente.
      </p>

      <p v-if="error" class="text-red-600 mt-4">
        {{ error }}
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()

const username = ref('')
const loading = ref(true)
const error = ref('')
const success = ref(false)

const API_BASE = 'http://localhost:8000/api'

// Cargar perfil
onMounted(async () => {
  loading.value = true
  error.value = ''
  success.value = false

  try {
    const res = await fetch(`${API_BASE}/auth/perfil.php`, {
      headers: {
        'Authorization': 'Bearer ' + auth.token
      }
    })

    const data = await res.json()

    if (!data.ok) {
      error.value = data.message
      return
    }

    username.value = data.user.nombre_de_usuario

  } catch (err) {
    error.value = 'No se pudo cargar el perfil.'
  } finally {
    loading.value = false
  }
})

// Editar perfil
const updateProfile = async () => {
  loading.value = true
  error.value = ''
  success.value = false

  try {
    const res = await fetch(`${API_BASE}/auth/editar.php`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token
      },
      body: JSON.stringify({ username: username.value })
    })

    const data = await res.json()

    if (!data.ok) {
      error.value = data.message
      return
    }

    success.value = true

    // Actualizar usuario en Pinia
    auth.user.nombre_de_usuario = username.value
    localStorage.setItem('user', JSON.stringify(auth.user))

  } catch (err) {
    error.value = 'No se pudo actualizar el perfil.'
  } finally {
    loading.value = false
  }
}
</script>
