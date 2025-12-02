<template>
  <section class="agenda-container">
    
    <div class="header">
      <h2 class="title">Mis Contactos</h2>

      <RouterLink to="/agenda/crear">
        <button class="btn-primary">+ Nuevo contacto</button>
      </RouterLink>
    </div>

    <p v-if="loading" class="loading">Cargando contactos...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="contactos.length > 0" class="grid">
      <div 
        v-for="c in contactos" 
        :key="c.id" 
        class="card"
      >
        <h3 class="name">{{ c.nombre }} {{ c.apellido }}</h3>

        <p><strong>Tel:</strong> {{ c.telefono }}</p>
        <p v-if="c.email"><strong>Email:</strong> {{ c.email }}</p>

        <div class="actions">

          
          <RouterLink :to="`/agenda/ver/${c.id}`">
            <button class="btn-view">Ver</button>
          </RouterLink>

          <RouterLink :to="`/agenda/${c.id}`">
            <button class="btn-edit">Editar</button>
          </RouterLink>

          <button class="btn-delete" @click="eliminar(c.id)">Eliminar</button>
        </div>
      </div>
    </div>

    <p v-else-if="!loading" class="empty">No tienes contactos aún</p>
    
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { apiFetch } from '../helpers/api'

const contactos = ref([])
const loading = ref(true)
const error = ref('')

async function cargarContactos() {
  const res = await apiFetch('/contactos/')
  if (!res || !res.ok) {
    error.value = res?.message || 'Error al cargar contactos'
  } else {
    contactos.value = res.data
  }
  loading.value = false
}

async function eliminar(id) {
  if (!confirm('¿Seguro que deseas eliminar este contacto?')) return

  const res = await apiFetch(`/contactos/eliminar.php?id=${id}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    contactos.value = contactos.value.filter(c => c.id !== id)
  } else {
    alert(res.message)
  }
}

onMounted(cargarContactos)
</script>

<style scoped>
.agenda-container {
  padding: 30px 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.title {
  font-size: 26px;
  font-weight: bold;
}

.loading, .error, .empty {
  text-align: center;
  margin-top: 15px;
  font-size: 17px;
}

.error {
  color: red;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 20px;
}

.card {
  background: #fff;
  padding: 20px;
  border-radius: 14px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.08);
  border: 1px solid #e5e5e5;
  transition: 0.2s;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 18px rgba(0,0,0,0.12);
}

.name {
  font-size: 20px;
  margin-bottom: 10px;
}

.actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.btn-primary {
  background: #0d6efd;
  color: white;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;
}

.btn-primary:hover {
  background: #0b5ed7;
}

.btn-view {
  background: #2563eb;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  font-weight: 600;
  cursor: pointer;
}

.btn-view:hover {
  background: #1e4ec9;
}

.btn-edit {
  background: #ffc107;
  color: #000;
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;
}

.btn-edit:hover {
  background: #e0a800;
}

.btn-delete {
  background: #dc3545;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;
}

.btn-delete:hover {
  background: #bb2d3b;
}
</style>
