const cervezaModel = require('../models/cerveza');

// Controlador para obtener una cerveza por su ID
async function obtenerCervezaPorId(req, res) {
    try {
        console.log('Solicitud recibida para obtener cerveza con ID:', req.params.id);
        const { id } = req.params;

        if (!id) {
            console.log('ID no proporcionado');
            return res.status(400).json({ mensaje: 'ID de cerveza requerido.' });
        }

        const resultado = await cervezaModel.obtenerCervezaPorId(id);
        console.log('Resultado del SP ObtenerCervezaPorId:', resultado.recordset);

        if (resultado.recordset.length === 0) {
            console.log('Cerveza no encontrada');
            return res.status(404).json({ mensaje: 'Cerveza no encontrada.' });
        }

        res.status(200).json(resultado.recordset[0]);
    } catch (error) {
        console.error('Error al obtener la cerveza:', error.message);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
}

// Controlador para recomendar cervezas al usuario
async function recomendarCervezas(req, res) {
    try {
        console.log('Solicitud recibida para recomendar cervezas con usuarioId:', req.body.usuarioId);
        const { usuarioId } = req.body;

        if (!usuarioId) {
            console.log('ID de usuario no proporcionado');
            return res.status(400).json({ mensaje: 'ID de usuario requerido.' });
        }

        const resultado = await cervezaModel.recomendarCervezas(usuarioId);
        console.log('Resultado del SP RecomendarCervezas:', resultado.recordset);

        if (resultado.recordset.length === 0) {
            console.log('No se encontraron cervezas recomendadas');
            return res.status(404).json({ mensaje: 'No se encontraron cervezas recomendadas.' });
        }

        res.status(200).json(resultado.recordset);
    } catch (error) {
        console.error('Error al recomendar cervezas:', error.message);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
}

// Controlador para agregar una nueva cerveza
async function agregarCerveza(req, res) {
    try {
        console.log('Solicitud recibida para agregar una cerveza:', req.body);
        const { nombre, tipo, descripcion, imagenURL, cerveceriaId } = req.body;

        if (!nombre || !tipo || !descripcion || !imagenURL || !cerveceriaId) {
            console.log('Datos faltantes para agregar la cerveza');
            return res.status(400).json({ mensaje: 'Faltan datos requeridos para agregar la cerveza.' });
        }

        const resultado = await cervezaModel.agregarCerveza(nombre, tipo, descripcion, imagenURL, cerveceriaId);
        console.log('Resultado del SP AgregarCerveza:', resultado);

        res.status(201).json({ mensaje: 'Cerveza agregada exitosamente.' });
    } catch (error) {
        console.error('Error al agregar la cerveza:', error.message);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
}

module.exports = {
    obtenerCervezaPorId,
    recomendarCervezas,
    agregarCerveza,
};
