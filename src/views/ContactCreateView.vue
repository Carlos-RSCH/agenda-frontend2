<template>
  <section class="create-container">
    <div class="card">
      <h2 class="title">Crear contacto</h2>

      <form @submit.prevent="crear" class="form">

        <div class="grid-2">
          <input v-model="nombre" class="input" placeholder="Nombre" required />
          <input v-model="apellido" class="input" placeholder="Apellido" />
        </div>

        <input v-model="telefono" class="input" placeholder="Teléfono" required />
        <input v-model="email" class="input" placeholder="Correo electrónico" />
        <input v-model="direccion" class="input" placeholder="Dirección" />

        <textarea v-model="notas" class="textarea" placeholder="Notas"></textarea>

        <button class="btn">Guardar</button>
      </form>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiFetch } from '../helpers/api'

const nombre = ref('')
const apellido = ref('')
const telefono = ref('')
const email = ref('')
const direccion = ref('')
const notas = ref('')
const error = ref('')

const router = useRouter()

async function crear() {
  const res = await apiFetch('/contactos/crear.php', {
    method: 'POST',
    body: JSON.stringify({
      nombre: nombre.value,
      apellido: apellido.value,
      telefono: telefono.value,
      email: email.value,
      direccion: direccion.value,
      notas: notas.value
    })
  })

  if (res.ok) {
    router.push('/agenda')
  } else {
    error.value = res.message
  }
}
</script>

<style scoped>
.create-container {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

.card {
  width: 100%;
  max-width: 650px;
  background: #fff;
  padding: 35px;
  border-radius: 16px;
  box-shadow: 0 0 25px rgba(0,0,0,0.1);
}

.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.error {
  color: red;
  margin-top: 15px;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
}

.input:focus {
  border-color: #007bff;
  outline: none;
}

.textarea {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: vertical;
  min-height: 80px;
}

.btn {
  background: #198754;
  color: white;
  padding: 12px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.btn:hover {
  background: #157347;
}
</style>
