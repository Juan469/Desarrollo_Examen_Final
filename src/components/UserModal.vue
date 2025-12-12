<template>
  <div class="modal fade" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        
        <div class="modal-header bg-primary-accent text-white">
          <h5 class="modal-title fw-bold">{{ form.id ? 'Editar' : 'Nuevo' }} Usuario</h5>
          <button class="btn-close btn-close-white" @click="close"></button>
        </div>
        
        <div class="modal-body">
          <div class="row g-3">
            
            <div class="col-md-6">
                <label class="form-label small fw-bold">Nombre Completo</label>
                <input v-model="form.nombre" class="form-control" placeholder="Nombre completo" required>
            </div>
            
            <div class="col-md-6">
                <label class="form-label small fw-bold">Username</label>
                <input v-model="form.username" class="form-control" placeholder="Username" required>
            </div>
            
            <div class="col-md-6">
                <label class="form-label small fw-bold">Email</label>
                <input v-model="form.email" class="form-control" placeholder="Email" required>
            </div>
            
            <div class="col-md-6">
                <label class="form-label small fw-bold">Teléfono</label>
                <input v-model="form.phone" class="form-control" placeholder="Teléfono">
            </div>

            <hr class="my-2">

            <div class="col-md-6">
                <label class="form-label small fw-bold">Contraseña</label>
                <input v-model="form.password" type="password" class="form-control" placeholder="Contraseña (dejar vacío si no cambia)">
            </div>
            
            <div class="col-md-6">
                <label class="form-label small fw-bold">Rol</label>
                <select v-model="form.role" class="form-select">
                    <option value="lector">Lector</option>
                    <option value="bibliotecario">Bibliotecario</option>
                    <option value="admin">Administrador</option>
                </select>
            </div>

            <div class="col-md-12">
                <div class="form-check pt-2">
                    <input class="form-check-input" type="checkbox" id="isActiveCheck" v-model="form.isActive">
                    <label class="form-check-label fw-bold" for="isActiveCheck">
                        Cuenta Activa
                    </label>
                </div>
            </div>

          </div>
        </div>
        
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="close">Cancelar</button>
          <button class="btn btn-primary-accent" @click="save">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";

export default {
  data() {
    return {
      form: {},
      modalObj: null
    };
  },
  methods: {
    open(user = {}) {
      // Valores por defecto
      const defaults = {
        nombre: "",
        username: "",
        email: "",
        password: "",
        phone: "", 
        role: "lector", 
        isActive: true, 
      };
      
      this.form = user.id 
        ? { ...defaults, ...user, password: "" } 
        : defaults; 
        
      this.modalObj = new Modal(this.$refs.modal);
      this.modalObj.show();
    },
    close() {
      this.modalObj?.hide();
    },
    save() {
      this.$emit("save", this.form); 
      this.close();
    }
  }
};
</script>

<style scoped>
/* Estilo del encabezado del modal */
.bg-primary-accent {
    background-color: #007BFF !important; /* Azul Primario */
}

/* Estilo del botón Guardar */
.btn-primary-accent {
    background-color: #007BFF !important;
    border-color: #007BFF !important;
    color: white;
}
.btn-primary-accent:hover {
    background-color: #0056b3 !important;
    border-color: #0056b3 !important;
}
</style>