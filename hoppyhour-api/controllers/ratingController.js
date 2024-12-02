const ratingModel = require('../models/rating');

// Controlador para obtener los ratings de una cerveza específica
async function obtenerRatingsDeCerveza(req, res) {
    try {
        const { cervezaId } = req.params;

        if (!cervezaId) {
            return res.status(400).json({ mensaje: 'ID de cerveza requerido.' });
        }

        const resultado = await ratingModel.obtenerRatingsDeCerveza(cervezaId);

        if (resultado.recordset.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron ratings para esta cerveza.' });
        }

        res.status(200).json(resultado.recordset);
    } catch (error) {
        console.error('Error al obtener los ratings de la cerveza:', error.message);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
}

// Controlador para insertar un nuevo rating para una cerveza
async function insertarRating(req, res) {
    try {
        const { usuarioId, cervezaId, rating, comentario } = req.body;

        if (!usuarioId || !cervezaId || !rating) {
            return res.status(400).json({ mensaje: 'Datos requeridos faltantes: usuarioId, cervezaId, rating.' });
        }

        await ratingModel.insertarRating(usuarioId, cervezaId, rating, comentario);
        res.status(201).json({ mensaje: 'Rating insertado exitosamente.' });
    } catch (error) {
        console.error('Error al insertar el rating:', error.message);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
}

// Controlador para obtener el rating promedio de una cervecería específica
async function obtenerRatingPorCerveceria(req, res) {
    try {
        const { cerveceriaId } = req.params;

        if (!cerveceriaId) {
            return res.status(400).json({ mensaje: 'ID de cervecería requerido.' });
        }

        const resultado = await ratingModel.obtenerRatingPorCerveceria(cerveceriaId);

        if (resultado.recordset.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontró ningún rating para esta cervecería.' });
        }

        res.status(200).json(resultado.recordset[0]);
    } catch (error) {
        console.error('Error al obtener el rating promedio de la cervecería:', error.message);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
}

module.exports = {
    obtenerRatingsDeCerveza,
    insertarRating,
    obtenerRatingPorCerveceria,
};
