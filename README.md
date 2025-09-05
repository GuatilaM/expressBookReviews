# expressBookReviews

A simple Express.js application for managing book reviews with user authentication.

## Features

- 👤 User registration and login
- 🌐 RESTful API endpoints
- ⚠️ Basic error handling
- 📜 Middleware for logging requests
- 🔐 JWT authentication for secure access
- ✍️ Ability to add, update, and delete book reviews
- 📚 Fetch book details by ISBN, author, or title
- 📝 Fetch reviews for a specific book

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone
    cd expressBookReviews/final_project
    ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
    
4. The server will be running at `http://localhost:5000`.

## Usage

You can use tools like Postman or curl to interact with the API endpoints. Make sure to include the JWT token in the `Authorization` header for protected routes.

## API Endpoints

- `GET /`: Get all books
- `GET /isbn/:isbn`: Get book details by ISBN
- `GET /author/:author`: Get books by author
- `GET /title/:title`: Get books by title
- `GET /review/:isbn`: Get reviews for a book by ISBN
- `POST /register`: Register a new user
- `POST /login`: Login and receive a JWT token
- `PUT /customer/auth/review/:isbn`: Add or update a book review (requires authentication)
- `DELETE /customer/auth/review/:isbn`: Delete a book review (requires authentication)

## License

Apache 2.0

---

# \[ES\] expressBookReviews

Una aplicación simple de Express.js para gestionar reseñas de libros con autenticación de usuarios.

## Características

- 👤 Registro e inicio de sesión de usuarios
- 🌐 Endpoints de API RESTful
- ⚠️ Manejo básico de errores
- 📜 Middleware para registrar solicitudes
- 🔐 Autenticación JWT para acceso seguro
- ✍️ Capacidad para agregar, actualizar y eliminar reseñas de libros
- 📚 Obtener detalles del libro por ISBN, autor o título
- 📝 Obtener reseñas para un libro específico

## Requisitos previos

- Node.js (v14 o superior)
- npm (v6 o superior)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone
    cd expressBookReviews/final_project
    ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor:
   ```bash
    npm start
    ```
4. El servidor estará corriendo en `http://localhost:5000`.

## Uso

Puedes usar herramientas como Postman o curl para interactuar con los endpoints de la API. Asegúrate de incluir el token JWT en el encabezado `Authorization` para las rutas protegidas.

## Endpoints de la API

- `GET /`: Obtener todos los libros
- `GET /isbn/:isbn`: Obtener detalles del libro por ISBN
- `GET /author/:author`: Obtener libros por autor
- `GET /title/:title`: Obtener libros por título
- `GET /review/:isbn`: Obtener reseñas de un libro por ISBN
- `POST /register`: Registrar un nuevo usuario
- `POST /login`: Iniciar sesión y recibir un token JWT
- `PUT /customer/auth/review/:isbn`: Agregar o actualizar una reseña de un libro (requiere autenticación)
- `DELETE /customer/auth/review/:isbn`: Eliminar una reseña de un libro (requiere autenticación)

## Licencia

Apache 2.0
