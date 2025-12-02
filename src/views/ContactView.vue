<template>
  <section>
    <h2>Información del contacto</h2>

    <p v-if="loading">Cargando...</p>
    <p v-if="error" style="color:red">{{ error }}</p>

    <div v-if="contacto && !loading" class="card">
      <h3>{{ contacto.nombre }} {{ contacto.apellido }}</h3>

      <p><strong>Teléfono:</strong> {{ contacto.telefono }}</p>
      <p v-if="contacto.email"><strong>Email:</strong> {{ contacto.email }}</p>
      <p v-if="contacto.direccion"><strong>Dirección:</strong> {{ contacto.direccion }}</p>
      <p v-if="contacto.notas"><strong>Notas:</strong> {{ contacto.notas }}</p>

      <br>
      <RouterLink to="/agenda">
        <button>Regresar</button>
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { apiFetch } from '../helpers/api'

const route = useRoute()
const id = route.params.id

const contacto = ref(null)
const loading = ref(true)
const error = ref('')

async function cargar() {
  const res = await apiFetch('/contactos/')
  if (!res.ok) {
    error.value = res.message
    return
  }

  contacto.value = res.data.find(c => c.id == id)

  if (!contacto.value) {
    error.value = 'Contacto no encontrado'
    return
  }

  loading.value = false
}

onMounted(cargar)
</script>

<style>
.card {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
  margin-top: 1rem;
}
</style>
