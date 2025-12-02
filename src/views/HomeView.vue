<template>
  <section class="home-container">
    <div class="card">
      <h1 class="title">Bienvenido a la Agenda de Contactos</h1>
      <p class="subtitle">
        Proyecto Full Stack con 
        <strong>Vue 3</strong>, 
        <strong>Pinia</strong>, 
        <strong>Vue Router</strong>, 
        <strong>PHP</strong> y 
        <strong>MySQL</strong>.
      </p>

      <router-link to="/login" class="btn">Iniciar sesión</router-link>
      <router-link to="/registro" class="btn-secondary">Registrarme</router-link>
    </div>
  </section>
</template>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  padding: 20px;
}

.card {
  max-width: 500px;
  background: white;
  padding: 35px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 0 25px rgba(0,0,0,0.1);
}

.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
}

.subtitle {
  font-size: 16px;
  margin-bottom: 25px;
  color: #555;
}

.btn {
  display: block;
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: 0.2s;
}

.btn:hover {
  background: #0064d6;
}

.btn-secondary {
  display: block;
  width: 100%;
  padding: 12px;
  background: #444;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: 0.2s;
}

.btn-secondary:hover {
  background: #222;
}
</style>
