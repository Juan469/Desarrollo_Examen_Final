// src/services/bookService.js

import api from "./api";

// USANDO RUTA /products (Basado en tu última referencia de MockAPI)

// 1. OBTENER todos los libros (GET)
export const getBooks = () => api.get("/products");

// 2. CREAR un libro (POST)
export const createBook = (data) => api.post("/products", data);

// 3. ACTUALIZAR un libro (PUT)
// CORRECCIÓN: Usamos template literal para insertar el ID en la URL: /products/ID
export const updateBook = (id, data) => api.put(`/products/${id}`, data);

// 4. ELIMINAR un libro (DELETE)
// CORRECCIÓN: Usamos template literal para insertar el ID en la URL: /products/ID
export const deleteBook = (id) => api.delete(`/products/${id}`);