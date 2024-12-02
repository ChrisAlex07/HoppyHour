const express = require('express');
const router = express.Router();
const cervezaController = require('../controllers/cervezaController');

// Definición de rutas
router.get('/:id', (req, res, next) => {
    console.log(`Solicitud recibida en ruta GET /:id con ID: ${req.params.id}`);
    next();
}, cervezaController.obtenerCervezaPorId);

router.post('/recomendar', (req, res, next) => {
    console.log('Solicitud recibida en ruta POST /recomendar');
    next();
}, cervezaController.recomendarCervezas);

router.post('/agregar', (req, res, next) => {
    console.log('Solicitud recibida en ruta POST /agregar');
    next();
}, cervezaController.agregarCerveza);

// Exporta el router
module.exports = router;
