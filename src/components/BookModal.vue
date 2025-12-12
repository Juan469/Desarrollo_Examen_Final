<template>
  <div class="modal fade" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">{{ form.id ? 'Editar' : 'Nuevo' }} Libro</h5>
          <button type="button" class="btn-close btn-close-white" @click="close"></button>
        </div>
        <form @submit.prevent="save">
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-md-8">
                <input v-model="form.titulo" class="form-control" placeholder="Título del libro" required>
              </div>
              <div class="col-md-4">
                <input v-model="form.isbn" class="form-control" placeholder="ISBN">
              </div>
              <div class="col-md-6">
                <input v-model="form.autor" class="form-control" placeholder="Autor" required>
              </div>
              <div class="col-md-6">
                <input v-model="form.editorial" class="form-control" placeholder="Editorial">
              </div>
              <div class="col-md-4">
                <input v-model="form.anio" type="number" class="form-control" placeholder="Año">
              </div>
              <div class="col-md-8">
                <input v-model="form.categoria" class="form-control" placeholder="Categoría">
              </div>
              <div class="col-12">
                <input v-model="form.imagen" class="form-control" placeholder="URL de la portada">
              </div>
              <div class="col-12">
                <textarea v-model="form.descripcion" class="form-control" rows="3" placeholder="Descripción"></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="close">Cancelar</button>
            <button type="submit" class="btn btn-success">Guardar</button>
          </div>
        </form>
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
    open(libro = {}) {
      // Usamos el operador ternario en 'id' para determinar si inicializamos con datos de edición 
      // o con un objeto vacío para un nuevo libro.
      this.form = libro.id ? { ...libro } : {
        titulo: "", autor: "", editorial: "", anio: "", isbn: "",
        categoria: "", imagen: "", descripcion: ""
      };
      
      // Aseguramos que modalObj se inicialice solo si es null
      if (!this.modalObj) {
        this.modalObj = new Modal(this.$refs.modal);
      }
      this.modalObj.show();
    },
    close() {
      this.modalObj?.hide();
    },
    // Esta función solo se llama si la validación HTML pasa
    save() {
      this.$emit("save", this.form);
      this.close();
    }
  },
  mounted() {
    // Inicializar el objeto modal una vez al montar el componente
    this.modalObj = new Modal(this.$refs.modal);
  }
};
</script>