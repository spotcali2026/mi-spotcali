const { UsuarioLugarFavorito } = require('../models/usuario_lugar_favorito.model');
const { bdmysql } = require('../database/mySqlConnection');

// ===============================
// GET TODOS
// ===============================
const favoritosGet = async (req, res) => {

    const data = await UsuarioLugarFavorito.findAll();

    res.json(data);
};

// ===============================
// GET FAVORITOS POR USUARIO (CON INFO DEL LUGAR 🔥)
// ===============================
const favoritosPorUsuario = async (req, res) => {

    const { id } = req.params;

    try {

        const [results] = await bdmysql.query(`
            SELECT l.*, ulf.calificacion
            FROM usuario_lugar_favorito ulf
            JOIN lugar l ON ulf.id_lugar = l.id_lugar
            WHERE ulf.id_usuario = ?
        `, {
            replacements: [id]
        });

        res.json(results);

    } catch (error) {

        res.status(500).json({
            msg: "Error obteniendo favoritos",
            error
        });

    }

};

// ===============================
// AGREGAR FAVORITO
// ===============================
const agregarFavorito = async (req, res) => {

    try {

        const data = await UsuarioLugarFavorito.create(req.body);

        res.json({
            msg: "Lugar agregado a favoritos",
            data
        });

    } catch (error) {

        res.status(500).json({
            msg: "Error al agregar favorito",
            error
        });

    }

};

// ===============================
// ACTUALIZAR CALIFICACION
// ===============================
const actualizarCalificacion = async (req, res) => {

    const { id_usuario, id_lugar } = req.params;

    const registro = await UsuarioLugarFavorito.findOne({
        where: { id_usuario, id_lugar }
    });

    if (!registro) {
        return res.status(404).json({
            msg: "Favorito no encontrado"
        });
    }

    await registro.update(req.body);

    res.json({
        msg: "Calificación actualizada",
        registro
    });

};

// ===============================
// ELIMINAR FAVORITO
// ===============================
const eliminarFavorito = async (req, res) => {

    const { id_usuario, id_lugar } = req.params;

    const registro = await UsuarioLugarFavorito.findOne({
        where: { id_usuario, id_lugar }
    });

    if (!registro) {
        return res.status(404).json({
            msg: "Favorito no existe"
        });
    }

    await registro.destroy();

    res.json({
        msg: "Favorito eliminado"
    });

};

module.exports = {
    favoritosGet,
    favoritosPorUsuario,
    agregarFavorito,
    actualizarCalificacion,
    eliminarFavorito
};