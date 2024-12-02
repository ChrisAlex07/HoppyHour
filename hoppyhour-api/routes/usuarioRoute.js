const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta para obtener un usuario por su ID
router.get('/:id', usuarioController.obtenerUsuarioPorId);

// Ruta para registrar un nuevo usuario
router.post('/registrar', usuarioController.registrarUsuario);

// Ruta para actualizar las preferencias del usuario
router.put('/:id/preferencias', usuarioController.actualizarPreferenciasUsuario);

// Ruta para actualizar la ubicación del usuario
router.put('/:id/ubicacion', usuarioController.actualizarUbicacionUsuario);

module.exports = router;
