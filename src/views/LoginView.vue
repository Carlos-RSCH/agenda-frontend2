<template>
  <section class="login-container">
    <h2>Iniciar sesión</h2>

    <form @submit.prevent="onSubmit" class="login-form">
      <input
        v-model="username"
        placeholder="Usuario"
        required
        class="input"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Contraseña"
        required
        class="input"
      />

      <button :disabled="auth.loading" class="btn">
        Entrar
      </button>
    </form>

    <p v-if="auth.error" class="error">{{ auth.error }}</p>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')

const onSubmit = async () => {
  try {
    await auth.login(username.value, password.value)
    router.push({ name: 'agenda' })
  } catch (err) {
    // error ya manejado en el store
  }
}
</script>

<style scoped>
.login-container {
  max-width: 350px;
  margin: 80px auto;
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input {
  padding: 10px;
  border: 1px solid gray;
  border-radius: 8px;
  font-size: 15px;
}

.btn {
  background: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.btn:disabled {
  background: #999;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
