const cerveceriaModel = require('../models/cerveceria');

// Controlador para obtener una cervecería por su ID
async function obtenerCerveceriaPorId(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ mensaje: 'ID de cervecería requerido.' });
        }

        const resultado = await cerveceriaModel.obtenerCerveceriaPorId(id);

        if (resultado.recordset.length === 0) {
            return res.status(404).json({ mensaje: 'Cervecería no encontrada.' });
        }

        res.status(200).json(resultado.recordset[0]);
    } catch (error) {
        console.error('Error al obtener la cervecería:', error.message);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
}

// Controlador para listar todas las cervecerías
async function listarCervecerias(req, res) {
    try {
        const resultado = await cerveceriaModel.listarCervecerias();

        if (resultado.recordset.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron cervecerías.' });
        }

        res.status(200).json(resultado.recordset);
    } catch (error) {
        console.error('Error al listar cervecerías:', error.message);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
}

// Controlador para obtener la cervecería más cercana
async function obtenerCerveceriaMasCercana(req, res) {
    try {
        const { lat, lng } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({ mensaje: 'Latitud y longitud son requeridas.' });
        }

        const resultado = await cerveceriaModel.obtenerCerveceriaMasCercana(lat, lng);

        if (resultado.recordset.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontró ninguna cervecería cercana.' });
        }

        res.status(200).json(resultado.recordset[0]);
    } catch (error) {
        console.error('Error al obtener la cervecería más cercana:', error.message);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
}

// Exportación de todas las funciones
module.exports = {
    obtenerCerveceriaPorId,
    listarCervecerias,
    obtenerCerveceriaMasCercana,
};
