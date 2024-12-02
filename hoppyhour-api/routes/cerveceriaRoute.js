const express = require('express');
const router = express.Router();
const cerveceriaController = require('../controllers/cerveceriaController');

// Ruta para obtener la cervecería más cercana (mover a la parte superior)
router.get('/mas-cercana', cerveceriaController.obtenerCerveceriaMasCercana);

// Ruta para listar todas las cervecerías
router.get('/', cerveceriaController.listarCervecerias);

// Ruta para obtener una cervecería por su ID
router.get('/:id', cerveceriaController.obtenerCerveceriaPorId);

module.exports = router;
