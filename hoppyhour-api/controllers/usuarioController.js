const usuarioModel = require('../models/usuario');

// Obtener un usuario por su ID
async function obtenerUsuarioPorId(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send('ID de usuario requerido.');
    }

    const resultado = await usuarioModel.obtenerUsuarioPorId(id);
    if (resultado.recordset.length === 0) {
      return res.status(404).send('Usuario no encontrado.');
    }

    res.status(200).json(resultado.recordset[0]);
  } catch (error) {
    console.error('Error al obtener el usuario:', error.message);
    res.status(500).send('Error interno del servidor.');
  }
}

// Registrar un nuevo usuario
async function registrarUsuario(req, res) {
  try {
    const { email, nombre, lat, lng, preferencias } = req.body;

    if (!email || !nombre || lat == null || lng == null || !preferencias) {
      return res.status(400).send('Todos los campos son requeridos.');
    }

    const resultado = await usuarioModel.registrarUsuario(email, nombre, lat, lng, preferencias);
    res.status(201).send('Usuario registrado exitosamente.');
  } catch (error) {
    console.error('Error al registrar el usuario:', error.message);
    res.status(500).send('Error al registrar el usuario.');
  }
}

// Actualizar preferencias del usuario
async function actualizarPreferenciasUsuario(req, res) {
  try {
    const { id } = req.params;
    const { preferencias } = req.body;

    if (!id || !preferencias) {
      return res.status(400).send('ID de usuario y preferencias son requeridos.');
    }

    const resultado = await usuarioModel.actualizarPreferenciasUsuario(id, preferencias);
    res.status(200).send('Preferencias actualizadas exitosamente.');
  } catch (error) {
    console.error('Error al actualizar las preferencias del usuario:', error.message);
    res.status(500).send('Error interno del servidor.');
  }
}

// Actualizar la ubicación del usuario
async function actualizarUbicacionUsuario(req, res) {
  try {
    const { id } = req.params;
    const { lat, lng } = req.body;

    if (!id || lat == null || lng == null) {
      return res.status(400).send('ID de usuario, latitud y longitud son requeridos.');
    }

    const resultado = await usuarioModel.actualizarUbicacionUsuario(id, lat, lng);
    res.status(200).send('Ubicación actualizada exitosamente.');
  } catch (error) {
    console.error('Error al actualizar la ubicación del usuario:', error.message);
    res.status(500).send('Error interno del servidor.');
  }
}

module.exports = {
  obtenerUsuarioPorId,
  registrarUsuario,
  actualizarPreferenciasUsuario,
  actualizarUbicacionUsuario,
};
