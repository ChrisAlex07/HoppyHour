const sql = require('mssql');
require('dotenv').config();
const { poolPromise } = require('../db'); // Importamos la configuración del pool de conexión

// Modelo para obtener una cerveza por su ID
async function obtenerCervezaPorId(id) {
    try {
        const pool = await poolPromise; // Espera a obtener una conexión del pool
        const resultado = await pool.request()
            .input('id', sql.Int, id)
            .execute('ObtenerCervezaPorId'); // Ejecuta el Stored Procedure que obtiene una cerveza por ID

        console.log('Resultado del SP ObtenerCervezaPorId:', resultado.recordset);
        return resultado;
    } catch (error) {
        console.error('Error en el modelo de cerveza (obtenerCervezaPorId):', error.message);
        throw error; // Lanza el error para que pueda ser capturado por el controlador
    }
}

// Modelo para recomendar cervezas según las preferencias del usuario
async function recomendarCervezas(usuarioId) {
    try {
        const pool = await poolPromise; // Espera a obtener una conexión del pool
        const resultado = await pool.request()
            .input('usuarioId', sql.Int, usuarioId)
            .execute('RecomendarCervezas'); // Ejecuta el Stored Procedure que recomienda cervezas

        console.log('Resultado del SP RecomendarCervezas:', resultado.recordset);
        return resultado;
    } catch (error) {
        console.error('Error en el modelo de cerveza (recomendarCervezas):', error.message);
        throw error; // Lanza el error para que pueda ser capturado por el controlador
    }
}

// Modelo para agregar una nueva cerveza a la base de datos
async function agregarCerveza(nombre, tipo, descripcion, imagenURL, cerveceriaId) {
    try {
        const pool = await poolPromise; // Espera a obtener una conexión del pool
        const resultado = await pool.request()
            .input('nombre', sql.NVarChar, nombre)
            .input('tipo', sql.NVarChar, tipo)
            .input('descripcion', sql.NVarChar, descripcion)
            .input('imagenURL', sql.NVarChar, imagenURL)
            .input('cerveceriaId', sql.Int, cerveceriaId)
            .execute('AgregarCerveza'); // Ejecuta el Stored Procedure que agrega una nueva cerveza

        console.log('Resultado del SP AgregarCerveza:', resultado);
        return resultado;
    } catch (error) {
        console.error('Error en el modelo de cerveza (agregarCerveza):', error.message);
        throw error; // Lanza el error para que pueda ser capturado por el controlador
    }
}

// Exportación de las funciones del modelo
module.exports = {
    obtenerCervezaPorId,
    recomendarCervezas,
    agregarCerveza,
};
