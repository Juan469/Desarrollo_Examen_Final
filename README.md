
#  Librería Online - Sistema de Gestión

Sistema de gestión de librería con Vue.js 3 que permite administrar libros y usuarios mediante operaciones CRUD, autenticación y protección de rutas.

##  Autores

- **Juan José Quintero Sánchez** - 192456
- **Kevin Martínez Otero** - 192537

##  Tecnologías

- Vue.js 3
- Vue Router 4
- Bootstrap 5
- Axios
- MockAPI

##  Características

-  Sistema de autenticación con login
-  CRUD completo de libros (crear, leer, actualizar, eliminar)
-  CRUD completo de usuarios
-  Búsqueda y filtrado de libros
-  Protección de rutas
-  Interfaz responsiva
-  Alertas flotantes
-  Modales de confirmación

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Juan469/Desarrollo_Examen_Final.git

# Entrar al directorio
cd libreria-online

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run serve
```

## 🌐 URL de la Aplicación

```
http://localhost:8080
```

## 🔑 Credenciales de Prueba

Usar cualquier usuario registrado en MockAPI:
```
Email: usuario@example.com
Password: [contraseña del usuario]
```

<<<<<<< HEAD
## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── BookModal.vue
│   ├── UserModal.vue
│   ├── DeleteModal.vue
│   └── Navbar.vue
├── views/              # Vistas principales
│   ├── LoginView.vue
│   ├── BooksView.vue
│   └── UsersView.vue
├── router/             # Configuración de rutas
│   └── index.js
├── services/           # Servicios de API
│   ├── api.js
│   ├── authService.js
│   ├── bookService.js
│   └── userService.js
├── App.vue
└── main.js
```

## 🛠️ Funcionalidades

### Autenticación
- Login con validación de credenciales
- Token de sesión en sessionStorage
- Protección de rutas administrativas

### Gestión de Libros
- Crear, leer, actualizar y eliminar libros
- Búsqueda por título o autor
- Filtrado por categoría
- Grid responsivo con imágenes

### Gestión de Usuarios
- CRUD completo de usuarios
- Formulario de creación rápida
- Roles: Admin/Lector
- Estados: Activo/Inactivo

## 🌍 API Backend

**Base URL:** `https://693b1a0a9b80ba7262cc6f23.mockapi.io`

**Endpoints:**
```
GET    /users          # Listar usuarios
POST   /users          # Crear usuario
PUT    /users/:id      # Actualizar usuario
DELETE /users/:id      # Eliminar usuario

GET    /products       # Listar libros
POST   /products       # Crear libro
PUT    /products/:id   # Actualizar libro
DELETE /products/:id   # Eliminar libro
```

## 🎨 Paleta de Colores

- **Navbar:** `#343A40` (Gris carbón)
- **Botones principales:** `#007BFF` (Azul)
- **Éxito:** `#28A745` (Verde)
- **Peligro:** `#DC3545` (Rojo)

## 📸 Capturas de Pantalla

### Login
Pantalla de inicio de sesión con fondo de librería.

### Gestión de Libros
Vista principal con búsqueda, filtros y grid de libros.

### Gestión de Usuarios
Vista de usuarios con formulario rápido y estadísticas.

## 📝 Licencia

Este proyecto fue desarrollado con fines académicos.

## 📧 Contacto

- Juan José Quintero Sánchez - 192456
- Kevin Martínez Otero - 192537

# Desarrollo_Examen_Final

