<template>
  <section class="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
    <h2 class="text-2xl font-bold mb-4">Registro</h2>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <input 
        v-model="username" 
        placeholder="Usuario" 
        required
        class="w-full border px-3 py-2 rounded"
      />

      <input 
        v-model="password" 
        type="password" 
        placeholder="Contraseña" 
        required
        class="w-full border px-3 py-2 rounded"
      />

      <button 
        :disabled="auth.loading"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Registrarse
      </button>
    </form>

    <p v-if="auth.error" class="text-red-600 mt-3">
      {{ auth.error }}
    </p>

    <p v-if="success" class="text-green-600 mt-3">
      Registro exitoso, ahora puedes iniciar sesión.
    </p>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const username = ref('')
const password = ref('')
const success = ref(false)

const onSubmit = async () => {
  success.value = false
  
  const ok = await auth.register(username.value, password.value)

  if (ok) {
    success.value = true
    username.value = ''
    password.value = ''
  }
}
</script>
