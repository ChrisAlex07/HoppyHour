const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

// Ruta para obtener los ratings de una cerveza específica
router.get('/cerveza/:cervezaId', ratingController.obtenerRatingsDeCerveza);

// Ruta para insertar un nuevo rating para una cerveza
router.post('/', ratingController.insertarRating);

// Ruta para obtener el rating promedio de una cervecería específica
router.get('/cerveceria/:cerveceriaId/promedio', ratingController.obtenerRatingPorCerveceria);

module.exports = router;
