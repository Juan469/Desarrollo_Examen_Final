<template>
  <div class="login-page d-flex align-items-center justify-content-center min-vh-100">
    
    <div class="card shadow-lg border-0 rounded-4 login-box">
      <div class="card-body p-5 text-center">
        
        <h1 class="fw-bold mb-2 login-title-accent">📚 Librería Online</h1>
        <p class="text-muted mb-4">Panel de Administración</p>

        <div class="mb-4">
          <input 
            v-model="email" 
            type="email" 
            class="form-control form-control-lg rounded-pill text-center" 
            placeholder="Correo electrónico" 
            @keyup.enter="ingresar" 
            required
          >
        </div>
        
        <div class="mb-4">
          <input 
            v-model="password" 
            type="password" 
            class="form-control form-control-lg rounded-pill text-center" 
            placeholder="Contraseña" 
            @keyup.enter="ingresar" 
            required
          >
        </div>

        <button @click="ingresar" class="btn btn-lg w-100 rounded-pill shadow boton-login-libreria">
          Ingresar
        </button>

        <div v-if="error" class="alert alert-danger mt-4 rounded-pill small">
          Credenciales incorrectas
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "../services/authService";

export default {
  data() {
    return { email: "", password: "", error: false };
  },
  methods: {
    async ingresar() {
      const user = await login(this.email, this.password);
      if (!user) {
        this.error = true;
      } else {
        this.$router.push("/books"); 
      }
    }
  }
};
</script>

<style scoped>
/* ========================================= */
/* ESTILOS CON FONDO DE LIBRERÍA MEJORADO */
/* ========================================= */

.login-page {
    /* OPCIÓN 1: Libros coloridos en estantería - MUY VISIBLE ⭐ (recomendado) */
    background-image: url('https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2098&auto=format&fit=crop');
    
    /* OPCIÓN 2: Libros antiguos en biblioteca clásica */
    /* background-image: url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2028&auto=format&fit=crop'); */
    
    /* OPCIÓN 3: Libros apilados primer plano */
    /* background-image: url('https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=2070&auto=format&fit=crop'); */
    
    /* OPCIÓN 4: Estantería completa con muchos libros */
    /* background-image: url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop'); */
    
    /* OPCIÓN 5: Librería vintage con escalera */
    /* background-image: url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2090&auto=format&fit=crop'); */
    
    background-size: cover; 
    background-position: center; 
    background-repeat: no-repeat; 
    background-attachment: fixed; /* Efecto parallax sutil */
    
    /* Capa oscura para mejor contraste */
    position: relative;
}

.login-page::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(58, 35, 20, 0.65); /* Overlay marrón oscuro */
    z-index: 1;
}

/* Caja del formulario (debe estar sobre el overlay) */
.login-box {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 420px; 
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(250, 245, 240, 0.98));
    backdrop-filter: blur(10px); /* Efecto de vidrio esmerilado */
    padding: 2.5rem !important; 
    border-radius: 16px !important;
    border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Título con sombra para resaltar */
.login-title-accent {
    color: #8A4521; 
    font-size: 2.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    font-family: 'Georgia', serif; /* Fuente más elegante para librería */
}

/* Campos de entrada mejorados */
.form-control-lg {
    padding: 0.85rem 1.5rem;
    border: 2px solid #D3B8AE;
    background-color: #FFFBF7;
    transition: all 0.3s ease;
}

.form-control-lg:focus {
    border-color: #8A4521;
    box-shadow: 0 0 0 0.2rem rgba(138, 69, 33, 0.15);
    background-color: white;
}

/* Botón con efecto de elevación */
.boton-login-libreria {
    background: linear-gradient(135deg, #8A4521 0%, #6C3519 100%);
    border: none;
    color: white !important;
    font-weight: bold;
    padding: 14px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(138, 69, 33, 0.3);
}

.boton-login-libreria:hover {
    background: linear-gradient(135deg, #6C3519 0%, #5A2912 100%);
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(138, 69, 33, 0.4);
}

.boton-login-libreria:active {
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(138, 69, 33, 0.3);
}

/* Estilo del error mejorado */
.alert-danger {
    background-color: rgba(248, 215, 218, 0.95);
    color: #721C24;
    border: 1px solid #F5C6CB;
    font-weight: 500;
}

/* Animación de entrada suave */
.login-box {
    animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive - ajustar en móviles */
@media (max-width: 576px) {
    .login-box {
        max-width: 90%;
        padding: 2rem !important;
    }
    
    .login-title-accent {
        font-size: 2rem;
    }
}
</style>