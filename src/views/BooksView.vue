<template>
  <div>
    <Navbar />
    <!-- ALERTA FLOTANTE SUPERIOR (Toast) -->
    <transition name="slide-down">
      <div v-if="mensaje" class="alert-flotante">
        <div class="alert alert-success alert-dismissible fade show shadow-lg" role="alert">
          <strong>✅ ¡Éxito!</strong> {{ mensaje }}
          <button type="button" class="btn-close" @click="mensaje = ''" aria-label="Close"></button>
        </div>
      </div>
    </transition>

    <div class="min-vh-100 fondo-libreria-sutil">
      <div class="container">
        
        <div class="text-center mb-3 pt-2">
          <h1 class="display-6 fw-bold titulo-principal">📚 Gestión de Libros</h1>
        </div>

        <div class="row mb-3 align-items-center">
            <div class="col-md-5 mb-2 mb-md-0">
                <input type="text" v-model="filtroBusqueda" class="form-control rounded-pill shadow-sm" placeholder="🔍 Buscar por título o autor...">
            </div>
            
            <div class="col-md-3 mb-2 mb-md-0">
                <select v-model="filtroCategoria" class="form-select rounded-pill shadow-sm">
                    <option value="">Todas las Categorías</option>
                    <option v-for="cat in categoriasUnicas" :key="cat" :value="cat">{{ cat }}</option>
                </select>
            </div>

            <div class="col-md-4 text-md-end">
                <button @click="abrirModalNuevo" class="btn shadow-lg rounded-pill px-4 py-2 boton-agregar-minimal w-100 w-md-auto">
                    ➕ Agregar Libro
                </button>
            </div>
        </div>
        
        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <div class="card border-0 shadow-sm text-center py-2 rounded-3 card-stat-minimal card-dark">
              <h3 class="fw-bold mb-0 text-white">{{ librosFiltrados.length }}</h3>
              <p class="small mb-0 text-white-50">Libros</p>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card border-0 shadow-sm text-center py-2 rounded-3 card-stat-minimal card-light-accent">
              <h3 class="fw-bold mb-0" style="color: #007BFF;">{{ categoriasUnicas.length }}</h3>
              <p class="small mb-0 text-primary">Categorías</p>
            </div>
          </div>
        </div>
        
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 pb-4">
          <div v-for="libro in librosFiltrados" :key="libro.id" class="col">
            <div class="card h-100 border-0 shadow-sm rounded-3 overflow-hidden hover-book-compact">

              <img :src="libro.imagen || 'https://via.placeholder.com/400x550/F0F0F0/6C757D?text=' + (libro.titulo?.substring(0,15) || 'Libro')" 
                class="w-100 book-cover-image-compact" alt="Portada">

              <div class="p-2 bg-white d-flex flex-column justify-content-between flex-grow-1">
                <div>
                  <h6 class="fw-bold text-dark mb-1 text-truncate small">{{ libro.titulo || 'Sin título' }}</h6>
                  <p class="text-secondary small mb-1 text-truncate" style="font-size: 0.75rem;">{{ libro.autor || 'Autor desconocido' }}</p>

                  <span class="badge rounded-pill px-2 py-1 mb-1 badge-categoria-minimal" style="font-size: 0.65rem;">
                    {{ libro.categoria || 'General' }}
                  </span>
                </div>

                <div class="d-grid gap-1 mt-1"> 
                    <button @click="abrirModalEditar(libro)" class="btn btn-sm rounded-pill btn-primary-accent-minimal py-1">
                      ✏️
                    </button>
                    <button @click="preguntarEliminar(libro)" class="btn btn-sm btn-outline-danger rounded-pill py-1">
                      🗑️
                    </button>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="librosFiltrados.length === 0" class="col-12 text-center py-3">
              <div class="alert alert-info rounded-3">
                  <h5 class="mb-0">📖 No se encontraron libros</h5>
              </div>
          </div>
        </div>
      </div>

      <BookModal ref="bookModal" @save="guardarLibro" />
      <DeleteModal ref="deleteModal" @confirm="confirmarEliminar" />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import BookModal from "../components/BookModal.vue";
import DeleteModal from "../components/DeleteModal.vue";
import { getBooks, createBook, updateBook, deleteBook } from "../services/bookService";

export default {
  components: { Navbar, BookModal, DeleteModal },
  data() {
    return {
      libros: [],
      libroAEliminar: null,
      mensaje: "", 
      filtroBusqueda: '',
      filtroCategoria: ''
    };
  },
  computed: {
    categoriasUnicas() {
      return [...new Set(this.libros.map(l => l.categoria).filter(Boolean))];
    },
    librosFiltrados() {
        let libros = this.libros;

        if (this.filtroCategoria) {
            libros = libros.filter(l => l.categoria === this.filtroCategoria);
        }

        if (this.filtroBusqueda) {
            const busqueda = this.filtroBusqueda.toLowerCase();
            libros = libros.filter(l => 
                (l.titulo && l.titulo.toLowerCase().includes(busqueda)) || 
                (l.autor && l.autor.toLowerCase().includes(busqueda))
            );
        }

        return libros;
    }
  },
  created() {
    this.cargarLibros();
  },
  methods: {
    async cargarLibros() {
      try {
        const res = await getBooks();
        this.libros = res.data;
      } catch (error) {
        console.error("Error al cargar libros:", error);
      }
    },

    abrirModalNuevo() {
      this.$refs.bookModal.open({});
    },

    abrirModalEditar(libro) {
      this.$refs.bookModal.open(libro);
    },

    async guardarLibro(data) {
      if (data.id) {
        await updateBook(data.id, data);
        this.mensaje = "¡Libro actualizado exitosamente!";
      } else {
        await createBook(data);
        this.mensaje = "¡Libro creado exitosamente!";
      }
      
      this.cargarLibros();
      setTimeout(() => this.mensaje = "", 3000); 
    },

    preguntarEliminar(libro) {
      this.libroAEliminar = libro;
      this.$refs.deleteModal.open();
    },

    async confirmarEliminar() {
      await deleteBook(this.libroAEliminar.id);
      this.cargarLibros();
      this.mensaje = "Libro eliminado correctamente.";
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

.fondo-libreria-sutil {
    background: linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.92)), url('https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2098&auto=format&fit=crop');
    background-size: cover; background-position: center; background-attachment: fixed; padding-top: 2rem; padding-bottom: 3rem;
}

.titulo-principal { color: #212529; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); }

.boton-agregar-minimal { background: linear-gradient(135deg, #007BFF 0%, #0056b3 100%) !important; color: white !important; font-weight: bold; border: none; transition: all 0.3s ease; }
.boton-agregar-minimal:hover { background: linear-gradient(135deg, #0056b3 0%, #004085 100%) !important; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4); }

.form-control, .form-select { border: 2px solid #E9ECEF; transition: all 0.3s ease; }
.form-control:focus, .form-select:focus { border-color: #007BFF; box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.15); }

.card-stat-minimal { box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); transition: all 0.3s ease; }
.card-stat-minimal:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15); }
.card-dark { background: linear-gradient(135deg, #343A40 0%, #212529 100%); }
.card-light-accent { background: linear-gradient(135deg, #D6E9FF 0%, #B8DAFF 100%); }

.hover-book-compact { transition: all 0.4s ease; background-color: white; }
.hover-book-compact:hover { transform: translateY(-8px); box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2); }

.book-cover-image-compact { height: 160px !important; object-fit: cover; border-bottom: 2px solid #E9ECEF; }
.badge-categoria-minimal { background-color: #E9ECEF !important; color: #495057 !important; font-weight: 600; font-size: 0.7rem; }

.btn-primary-accent-minimal { background: linear-gradient(135deg, #007BFF 0%, #0056b3 100%) !important; color: white !important; border: none; font-weight: 600; transition: all 0.3s ease; }
.btn-primary-accent-minimal:hover { background: linear-gradient(135deg, #0056b3 0%, #004085 100%) !important; transform: scale(1.02); }
.btn-outline-danger { border: 2px solid #DC3545; color: #DC3545; font-weight: 600; transition: all 0.3s ease; }
.btn-outline-danger:hover { background-color: #DC3545; color: white; transform: scale(1.02); }

.alert { border: none; font-weight: 500; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.card { animation: fadeIn 0.5s ease-out; }
@media (max-width: 768px) { .book-cover-image-compact { height: 160px !important; } }
</style>