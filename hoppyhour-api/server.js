const express = require('express');  // Importa Express
require('dotenv').config();  // Carga las variables de entorno desde el archivo .env

// Inicializa la aplicación Express
const app = express();

// Importa las rutas
const cervezaRoutes = require('./routes/cervezaRoute');  // Rutas para cervezas
const usuarioRoutes = require('./routes/usuarioRoute');  // Rutas para usuarios
const cerveceriaRoutes = require('./routes/cerveceriaRoute');  // Rutas para cervecerías
const ratingRoutes = require('./routes/ratingRoute');  // Rutas para ratings

// Middleware para parsear JSON
app.use(express.json());

// Registra las rutas en la aplicación
app.use('/cervezas', cervezaRoutes);  // Ruta base para cervezas
app.use('/usuarios', usuarioRoutes);  // Ruta base para usuarios
app.use('/cervecerias', cerveceriaRoutes);  // Ruta base para cervecerías
app.use('/ratings', ratingRoutes);  // Ruta base para ratings

// Middleware para manejar rutas no encontradas (404)
app.use((req, res, next) => {
    res.status(404).json({
        mensaje: "Recurso no encontrado."
    });
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error('Error interno del servidor:', err);
    res.status(500).json({
        mensaje: "Error interno del servidor. "
    });
});

// Configuración del puerto
const port = process.env.PORT || 3000;

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
