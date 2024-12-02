const sql = require('mssql');
require('dotenv').config();
const { poolPromise } = require('../db');

// Obtener un usuario por su ID
async function obtenerUsuarioPorId(id) {
    try {
        const pool = await poolPromise;
        const resultado = await pool.request()
            .input('id', sql.NVarChar, id) // Usamos NVARCHAR ya que el ID podría ser un UUID o similar
            .execute('ObtenerUsuarioPorId'); // Stored Procedure que obtiene un usuario por ID

        console.log('Resultado del SP ObtenerUsuarioPorId:', resultado.recordset);
        return resultado;
    } catch (error) {
        console.error('Error en el modelo de usuario (obtenerUsuarioPorId):', error.message);
        throw error;
    }
}

// Registrar un nuevo usuario
async function registrarUsuario(email, nombre, lat, lng, preferencias) {
    try {
        const pool = await poolPromise;
        const resultado = await pool.request()
            .input('email', sql.NVarChar, email)
            .input('nombre', sql.NVarChar, nombre)
            .input('lat', sql.Float, lat)
            .input('lng', sql.Float, lng)
            .input('preferencias', sql.NVarChar, JSON.stringify(preferencias)) // Convertimos a JSON
            .execute('AgregarUsuario'); // Stored Procedure que registra un usuario

        console.log('Resultado del SP AgregarUsuario:', resultado);
        return resultado;
    } catch (error) {
        console.error('Error en el modelo de usuario (registrarUsuario):', error.message);
        throw error;
    }
}

// Actualizar preferencias del usuario
async function actualizarPreferenciasUsuario(id, preferencias) {
    try {
        const pool = await poolPromise;
        const resultado = await pool.request()
            .input('id', sql.NVarChar, id)
            .input('preferencias', sql.NVarChar, JSON.stringify(preferencias))
            .execute('ActualizarPreferenciasUsuario'); // Stored Procedure para actualizar preferencias

        console.log('Resultado del SP ActualizarPreferenciasUsuario:', resultado);
        return resultado;
    } catch (error) {
        console.error('Error en el modelo de usuario (actualizarPreferenciasUsuario):', error.message);
        throw error;
    }
}

// Actualizar la ubicación del usuario
async function actualizarUbicacionUsuario(id, lat, lng) {
    try {
        const pool = await poolPromise;
        const resultado = await pool.request()
            .input('id', sql.NVarChar, id)
            .input('lat', sql.Float, lat)
            .input('lng', sql.Float, lng)
            .execute('ActualizarUbicacionUsuario'); // Stored Procedure para actualizar la ubicación

        console.log('Resultado del SP ActualizarUbicacionUsuario:', resultado);
        return resultado;
    } catch (error) {
        console.error('Error en el modelo de usuario (actualizarUbicacionUsuario):', error.message);
        throw error;
    }
}

module.exports = {
    obtenerUsuarioPorId,
    registrarUsuario,
    actualizarPreferenciasUsuario,
    actualizarUbicacionUsuario,
};
