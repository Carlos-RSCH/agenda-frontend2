<template>
  <section class="edit-container">
    <div class="card">
      <h2 class="title">Editar contacto</h2>

      <p v-if="loading" class="loading">Cargando...</p>

      <form v-if="!loading" @submit.prevent="guardar" class="form">
        
        <div class="grid-2">
          <input v-model="nombre" class="input" placeholder="Nombre" required />
          <input v-model="apellido" class="input" placeholder="Apellido" />
        </div>

        <input v-model="telefono" class="input" placeholder="Teléfono" required />
        <input v-model="email" class="input" placeholder="Correo electrónico" />
        <input v-model="direccion" class="input" placeholder="Dirección" />

        <textarea v-model="notas" class="textarea" placeholder="Notas"></textarea>

        <button class="btn">Guardar cambios</button>
      </form>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { apiFetch } from '../helpers/api'

const route = useRoute()
const router = useRouter()

const id = route.params.id
const nombre = ref('')
const apellido = ref('')
const telefono = ref('')
const email = ref('')
const direccion = ref('')
const notas = ref('')
const loading = ref(true)
const error = ref('')

async function cargar() {
  const res = await apiFetch('/contactos/')
  if (!res.ok) {
    error.value = res.message
    return
  }
  const contacto = res.data.find(c => c.id == id)

  if (!contacto) {
    error.value = 'Contacto no encontrado'
    return
  }

  nombre.value = contacto.nombre
  apellido.value = contacto.apellido
  telefono.value = contacto.telefono
  email.value = contacto.email
  direccion.value = contacto.direccion
  notas.value = contacto.notas

  loading.value = false
}

async function guardar() {
  const res = await apiFetch(`/contactos/actualizar.php?id=${id}`, {
    method: 'PUT',
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

onMounted(cargar)
</script>

<style scoped>
.edit-container {
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

.loading {
  text-align: center;
  color: #555;
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
  background: #0d6efd;
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
  background: #0b5ed7;
}
</style>
