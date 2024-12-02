const sql = require('mssql');
require('dotenv').config();
const { poolPromise } = require('../db');

// Obtener ratings de una cerveza específica
async function obtenerRatingsDeCerveza(cervezaId) {
    try {
        const pool = await poolPromise;
        return await pool.request()
            .input('CervezaId', sql.Int, cervezaId)
            .execute('ObtenerRatingsDeCerveza'); // Stored Procedure para obtener los ratings de una cerveza
    } catch (error) {
        console.error('Error en el modelo de rating (obtenerRatingsDeCerveza):', error.message);
        throw error;
    }
}

// Insertar un nuevo rating para una cerveza
async function insertarRating(usuarioId, cervezaId, rating, comentario) {
    try {
        const pool = await poolPromise;
        return await pool.request()
            .input('UsuarioId', sql.Int, usuarioId)
            .input('CervezaId', sql.Int, cervezaId)
            .input('Rating', sql.Int, rating)
            .input('Comentario', sql.NVarChar, comentario)
            .execute('InsertarRating'); // Stored Procedure para insertar un nuevo rating
    } catch (error) {
        console.error('Error en el modelo de rating (insertarRating):', error.message);
        throw error;
    }
}

// Obtener el rating promedio por cervecería específica
async function obtenerRatingPorCerveceria(cerveceriaId) {
    try {
        const pool = await poolPromise;
        return await pool.request()
            .input('CerveceriaId', sql.Int, cerveceriaId)
            .execute('ObtenerRatingsPorCerveceriaId'); // Stored Procedure para obtener el rating promedio por cervecería
    } catch (error) {
        console.error('Error en el modelo de rating (obtenerRatingPorCerveceria):', error.message);
        throw error;
    }
}

module.exports = {
    obtenerRatingsDeCerveza,
    insertarRating,
    obtenerRatingPorCerveceria,
};
