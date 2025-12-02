import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AgendaView from '../views/AgendaView.vue'
import ContactCreateView from '../views/ContactCreateView.vue'
import ContactEditView from '../views/ContactEditView.vue'
import ContactView from '../views/ContactView.vue'   
import ProfileView from '../views/ProfileView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/registro', name: 'registro', component: RegisterView },

  { path: '/agenda', name: 'agenda', component: AgendaView, meta: { requiresAuth: true } },
  { path: '/agenda/crear', name: 'crear-contacto', component: ContactCreateView, meta: { requiresAuth: true } },

  { path: '/agenda/:id', name: 'editar-contacto', component: ContactEditView, meta: { requiresAuth: true } },

  { path: '/agenda/ver/:id', name: 'ver-contacto', component: ContactView, meta: { requiresAuth: true } },

  { path: '/perfil', name: 'perfil', component: ProfileView, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'login' })
  } else if ((to.name === 'login' || to.name === 'registro') && auth.isAuthenticated) {
    next({ name: 'agenda' })
  } else {
    next()
  }
})

export default router
