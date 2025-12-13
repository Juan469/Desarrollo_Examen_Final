// src/services/authService.js

import api from "./api"; // Asegúrate de que esta ruta sea correcta

export async function login(email, password) {
  try {
    const res = await api.get("/users", {
      params: { email, password }
    });

    if (res.data.length === 0) return null;

    // Almacena el token para la autenticación
    sessionStorage.setItem("token", "BIBLIOTECA_" + Date.now());
    
    return {
      id: res.data[0].id,
      nombre: res.data[0].username || "Usuario",
      email: res.data[0].email
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}

export function logout() {
  sessionStorage.removeItem("token");
}

// Opcional: exportar el estado de autenticación
export const isAuthenticated = () => !!sessionStorage.getItem("token");