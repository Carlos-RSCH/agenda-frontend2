<template>
  <nav class="navbar">
    <div class="logo">
      <RouterLink to="/">FastAgenda</RouterLink>
    </div>

    <div class="links">
      <RouterLink v-if="isAuthenticated" to="/agenda" class="nav-link">Agenda</RouterLink>
      <RouterLink v-if="isAuthenticated" to="/perfil" class="nav-link">Perfil</RouterLink>

      <RouterLink v-if="!isAuthenticated" to="/login" class="nav-link">Login</RouterLink>
      <RouterLink v-if="!isAuthenticated" to="/registro" class="nav-link">Registro</RouterLink>

      <button 
        v-if="isAuthenticated" 
        @click="logout" 
        class="btn-logout"
      >
        Salir
      </button>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const { isAuthenticated } = storeToRefs(auth)
const router = useRouter()

const logout = () => {
  auth.clearAuth()
  router.push({ name: 'login' })
}
</script>

<style scoped>
.navbar {
  background: #0d6efd;
  color: white;
  padding: 14px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 3px 10px rgba(0,0,0,0.15);
}

.logo a {
  color: white;
  font-size: 22px;
  font-weight: 700;
  text-decoration: none;
}

.links {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-link {
  color: white;
  font-weight: 500;
  text-decoration: none;
  transition: 0.2s;
}

.nav-link:hover {
  color: #dfe9ff;
}

.btn-logout {
  background: #dc3545;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;
}

.btn-logout:hover {
  background: #bb2d3b;
}
</style>
