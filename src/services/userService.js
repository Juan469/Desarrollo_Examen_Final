// src/services/userService.js

import api from "./api"; // ✅ Ruta de API correcta

// [Operaciones CRUD para Usuarios]

// 1. OBTENER todos los usuarios (GET)
export const getUsers = () => api.get("/users"); // ✅ Ruta: /users

// 2. CREAR un nuevo usuario (POST)
export const createUser = (data) => api.post("/users", data); // ✅ Ruta: /users

// 3. ACTUALIZAR un usuario existente (PUT)
// ✅ Sintaxis correcta para incluir el ID en la URL.
export const updateUser = (id, data) => api.put(`/users/${id}`, data); 

// 4. ELIMINAR un usuario (DELETE)
// ✅ Sintaxis correcta para incluir el ID en la URL.
export const deleteUser = (id) => api.delete(`/users/${id}`);