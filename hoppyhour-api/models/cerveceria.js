const sql = require('mssql');
require('dotenv').config();
const { poolPromise } = require('../db');

// Obtener una cervecería por su ID
async function obtenerCerveceriaPorId(id) {
    try {
        const pool = await poolPromise;
        return await pool.request()
            .input('id', sql.Int, id)
            .execute('ObtenerCerveceriaPorId'); // Stored Procedure para obtener cervecería por ID
    } catch (error) {
        console.error('Error en el modelo de cervecería (obtenerCerveceriaPorId):', error.message);
        throw error;
    }
}

// Listar todas las cervecerías
async function listarCervecerias() {
    try {
        const pool = await poolPromise;
        return await pool.request()
            .execute('ListarCervecerias'); // Stored Procedure para listar todas las cervecerías
    } catch (error) {
        console.error('Error en el modelo de cervecería (listarCervecerias):', error.message);
        throw error;
    }
}

// Obtener la cervecería más cercana según latitud y longitud
async function obtenerCerveceriaMasCercana(lat, lng) {
    try {
        const pool = await poolPromise;
        return await pool.request()
            .input('Lat', sql.Float, lat)
            .input('Lng', sql.Float, lng)
            .execute('ObtenerCerveceriaMasCercana'); // Stored Procedure para obtener la cervecería más cercana
    } catch (error) {
        console.error('Error en el modelo de cervecería (obtenerCerveceriaMasCercana):', error.message);
        throw error;
    }
}

module.exports = {
    obtenerCerveceriaPorId,
    listarCervecerias,
    obtenerCerveceriaMasCercana,
};
