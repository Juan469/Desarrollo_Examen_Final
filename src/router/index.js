import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import BooksView from "../views/BooksView.vue";
import UsersView from "../views/UsersView.vue";

const routes = [
  // 1. RUTA RAÍZ: Redirige automáticamente a /login si no se especifica ruta.
  { 
    path: "/", 
    redirect: "/login" 
  },
  
  // 2. RUTA DE LOGIN
  { 
    path: "/login", 
    component: LoginView,
    name: "Login"
  },
  
  // 3. RUTAS PROTEGIDAS: Ahora usan los nombres definitivos para la navegación.
  { 
    // CORREGIDO: Usaremos /libros para ser consistentes con la redirección después del login
    path: "/Books", 
    component: BooksView, 
    meta: { requiresAuth: true },
    name: "Books"
  },
  { 
    // CORREGIDO: Usaremos /usuarios
    path: "/usuarios", 
    component: UsersView, 
    meta: { requiresAuth: true },
    name: "Usuarios"
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard de navegación para proteger rutas
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("token");
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !token) {
    // 1. Si necesita Auth y no hay token, redirige a /login (ruta definida)
    next("/login"); 
  } else if (to.path === "/login" && token) {
    // 2. Si ya está autenticado y trata de ir al login, redirige a /libros
    next("/libros");
  } else {
    // 3. Permite la navegación (Incluyendo la redirección de / a /login)
    next();
  }
});

export default router;