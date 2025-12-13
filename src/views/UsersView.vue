<template>
  <div>
    <Navbar />
    
    <transition name="slide-down">
      <div v-if="mensaje" class="alert-flotante">
        <div class="alert alert-success alert-dismissible fade show shadow-lg" role="alert">
          <strong>✅ ¡Éxito!</strong> {{ mensaje }}
          <button type="button" class="btn-close" @click="mensaje = ''" aria-label="Close"></button>
        </div>
      </div>
    </transition>

    <div class="min-vh-100 fondo-usuarios">
      <div class="container pt-5">
        
        <div class="text-center mb-3">
          <h1 class="display-6 fw-bold titulo-principal">👥 Gestión de Usuarios</h1>
        </div>

        <div class="card p-3 mb-3 shadow-lg border-0 rounded-4 formulario-creacion">
          <h4 class="mb-3 fw-bold" style="color: #343A40;">➕ Nuevo Usuario</h4>
          
          <div class="row g-2 align-items-end">
            <div class="col-md-3">
              <input v-model="nuevo.nombre" class="form-control" placeholder="Nombre Completo">
            </div>
            <div class="col-md-2">
              <input v-model="nuevo.username" class="form-control" placeholder="Username" required>
            </div>
            <div class="col-md-2">
              <input v-model="nuevo.email" type="email" class="form-control" placeholder="Email">
            </div>
            <div class="col-md-2">
              <input v-model="nuevo.password" type="password" class="form-control" placeholder="Contraseña">
            </div>
            <div class="col-md-1">
              <input v-model="nuevo.phone" class="form-control" placeholder="Teléfono">
            </div>
            <div class="col-md-1">
              <select v-model="nuevo.role" class="form-select">
                <option value="lector">Lector</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div class="col-md-1">
              <button @click="crear" class="btn btn-primary-accent w-100">➕</button>
            </div>
          </div>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-md-4">
            <div class="card border-0 shadow-sm text-center py-2 rounded-3 card-stat card-total">
              <h3 class="fw-bold mb-0 text-white">{{ usuarios.length }}</h3>
              <p class="small mb-0 text-white-50">Total</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card border-0 shadow-sm text-center py-2 rounded-3 card-stat card-activos">
              <h3 class="fw-bold mb-0" style="color: #28A745;">{{ usuariosActivos }}</h3>
              <p class="small mb-0 text-success">Activos</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card border-0 shadow-sm text-center py-2 rounded-3 card-stat card-admins">
              <h3 class="fw-bold mb-0" style="color: #FFC107;">{{ usuariosAdmin }}</h3>
              <p class="small mb-0 text-warning">Admins</p>
            </div>
          </div>
        </div>

        <div class="row mt-3 pb-4">
          <div class="col-md-6 mb-3" v-for="u in usuarios" :key="u.id">
            <div class="card h-100 shadow-sm border-0 rounded-3 hover-card">
              <div class="card-body p-3 d-flex flex-column">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 class="fw-bold text-dark mb-0">{{ u.nombre || 'Sin Nombre' }}</h6>
                    <p class="text-secondary small mb-0">@{{ u.username }}</p>
                  </div>
                  <span :class="['badge rounded-pill px-2 py-1', u.isActive ? 'bg-success' : 'bg-secondary']">
                    {{ u.isActive ? '✓' : '✗' }}
                  </span>
                </div>
                <div class="mb-2">
                  <p class="text-secondary mb-1 small">📧 {{ u.email }}</p>
                  <p class="text-secondary mb-0 small">📱 {{ u.phone || 'N/A' }}</p>
                </div>
                <div class="mb-2">
                  <span :class="['badge fw-bold px-2 py-1', u.role === 'admin' ? 'badge-admin' : 'badge-lector']">
                    {{ u.role === 'admin' ? '👑' : '📖' }}
                  </span>
                </div>
                <div class="mt-auto pt-2 border-top d-flex gap-2">
                  <button @click="editar(u)" class="btn btn-sm btn-primary-accent flex-grow-1">✏️</button>
                  <button @click="eliminar(u)" class="btn btn-sm btn-outline-danger flex-grow-1">🗑️</button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="usuarios.length === 0" class="col-12 text-center py-3">
            <div class="alert alert-info rounded-3">
              <h5 class="mb-0">👤 No hay usuarios</h5>
            </div>
          </div>
        </div>

        <UserModal ref="userModal" @save="guardarUsuario" />
        <DeleteModal ref="deleteModal" @confirm="confirmarEliminar" />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import UserModal from "../components/UserModal.vue";
import DeleteModal from "../components/DeleteModal.vue";
import { getUsers, createUser, updateUser, deleteUser } from "../services/userService";

export default {
  components: { Navbar, UserModal, DeleteModal },
  data() {
    return {
      usuarios: [],
      seleccionado: null,
      nuevo: { nombre: "", username: "", email: "", password: "", phone: "", role: "lector", isActive: true },
      mensaje: ""
    };
  },
  computed: {
    usuariosActivos() { return this.usuarios.filter(u => u.isActive).length; },
    usuariosAdmin() { return this.usuarios.filter(u => u.role === 'admin').length; }
  },
  created() { this.cargar(); },
  methods: {
    async cargar() {
      try {
        const res = await getUsers();
        this.usuarios = res.data;
      } catch (error) {
        console.error("Error cargando usuarios:", error);
      }
    },
    async crear() {
      if (!this.nuevo.nombre || !this.nuevo.username || !this.nuevo.email || !this.nuevo.password) {
        this.mensaje = "⚠️ Nombre, Username, Email y Contraseña son obligatorios";
        setTimeout(() => this.mensaje = "", 3000);
        return;
      }
      await createUser({ ...this.nuevo });
      this.nuevo = { nombre: "", username: "", email: "", password: "", phone: "", role: "lector", isActive: true };
      await this.cargar();
      this.mensaje = "Usuario creado exitosamente";
      setTimeout(() => this.mensaje = "", 3000);
    },
    editar(u) {
      this.seleccionado = u;
      this.$refs.userModal.open(u); 
    },
    async guardarUsuario(data) {
      if (data.id) {
        const payload = { ...data };
        if (!data.password) delete payload.password;
        await updateUser(data.id, payload);
        this.mensaje = "Usuario actualizado correctamente";
      } else {
        await createUser(data); 
        this.mensaje = "Usuario creado desde modal";
      }
      await this.cargar();
      setTimeout(() => this.mensaje = "", 3000);
    },
    eliminar(u) {
      this.seleccionado = u;
      this.$refs.deleteModal.open();
    },
    async confirmarEliminar() {
      await deleteUser(this.seleccionado.id);
      await this.cargar();
      this.mensaje = "Usuario eliminado correctamente";
      setTimeout(() => this.mensaje = "", 3000);
    }
  }
};
</script>

<style scoped>
.alert-flotante { position: fixed; top: 80px; left: 50%; transform: translateX(-50%); z-index: 9999; width: 90%; max-width: 600px; }
.alert-flotante .alert { border-radius: 12px; border: none; padding: 1rem 1.5rem; backdrop-filter: blur(10px); }
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.5s ease; }
.slide-down-enter-from { opacity: 0; transform: translateX(-50%) translateY(-50px); }
.slide-down-leave-to { opacity: 0; transform: translateX(-50%) translateY(-30px); }

.fondo-usuarios { background: linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 50%, #DEE2E6 100%); padding-top: 2rem; padding-bottom: 3rem; }
.titulo-principal { color: #212529; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); }

.formulario-creacion { background: linear-gradient(145deg, #FFFFFF 0%, #F8F9FA 100%); transition: all 0.3s ease; }
.formulario-creacion:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important; }
.form-control, .form-select { border: 2px solid #E9ECEF; transition: all 0.3s ease; }
.form-control:focus, .form-select:focus { border-color: #007BFF; box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.15); }

.btn-primary-accent { background: linear-gradient(135deg, #007BFF 0%, #0056b3 100%) !important; border: none !important; color: white !important; font-weight: bold; transition: all 0.3s ease; }
.btn-primary-accent:hover { background: linear-gradient(135deg, #0056b3 0%, #004085 100%) !important; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4); }
.btn-outline-danger { border: 2px solid #DC3545; color: #DC3545; font-weight: 600; transition: all 0.3s ease; }
.btn-outline-danger:hover { background-color: #DC3545; color: white; transform: translateY(-2px); }

.card-stat { transition: all 0.3s ease; }
.card-stat:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important; }
.card-total { background: linear-gradient(135deg, #343A40 0%, #212529 100%); }
.card-activos { background: linear-gradient(135deg, #D4EDDA 0%, #C3E6CB 100%); }
.card-admins { background: linear-gradient(135deg, #FFF3CD 0%, #FFEAA7 100%); }

.hover-card { transition: all 0.4s ease; background-color: white; }
.hover-card:hover { transform: translateY(-8px); box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2) !important; }

.badge-admin { background: linear-gradient(135deg, #FFC107 0%, #FFB300 100%); color: #664D00; }
.badge-lector { background: linear-gradient(135deg, #007BFF 0%, #0056b3 100%); color: white; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.card { animation: fadeIn 0.5s ease-out; }

@media (max-width: 768px) {
  .formulario-creacion .row { gap: 1rem; }
  .card-stat h2 { font-size: 2rem; }
}
</style>