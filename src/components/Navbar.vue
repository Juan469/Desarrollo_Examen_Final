<template>
  <nav class="navbar navbar-expand-lg shadow-sm fixed-top navbar-dark-minimal">
    <div class="container-fluid">
      <router-link class="navbar-brand fw-bold text-white fs-3" to="/libros">
        Librería Online
      </router-link>

      <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
        <span class="navbar-toggler-icon-custom"></span> 
      </button>

      <div class="collapse navbar-collapse" id="nav">
        <div class="ms-auto d-flex gap-3">
          <router-link to="/Books" class="btn btn-outline-light rounded-pill px-4 btn-nav">Libros</router-link>
          <router-link to="/usuarios" class="btn btn-outline-light rounded-pill px-4 btn-nav">Usuarios</router-link>
          <button @click="cerrarSesion" class="btn btn-primary rounded-pill px-4">Cerrar Sesión</button>
        </div>
      </div>
    </div>
  </nav>
  <div style="height: 85px;"></div> 
</template>

<script>
import { logout } from "../services/authService";
export default {
  methods: { cerrarSesion() { logout(); this.$router.push("/login"); }}
};
</script>

<style scoped>
.navbar-dark-minimal { background-color: #343A40 !important; transition: background-color 0.3s ease; }
.btn-nav { border-color: rgba(255, 255, 255, 0.4) !important; }
.navbar-toggler-icon-custom { background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgba(255, 255, 255, 0.8)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important; }
.btn-primary { background-color: #007BFF !important; border-color: #007BFF !important; }
</style>