const { Ruta } = require('../models/ruta.model');
const { bdmysql } = require('../database/mySqlConnection');
const { Op } = require('sequelize');


// ===============================
// GET TODAS LAS RUTAS
// ===============================
const rutasGet = async (req, res) => {

    const rutas = await Ruta.findAll();

    res.json({
        ok: true,
        rutas
    });

};

// ===============================
// GET DETALLE COMPLETO DE UNA RUTA
// ===============================
const detalleRuta = async (req, res) => {

    const { id } = req.params;

    try {

        // 🔹 1. INFO DE LA RUTA
        const [ruta] = await bdmysql.query(`
            SELECT * FROM ruta WHERE id_ruta = ?
        `, {
            replacements: [id]
        });

        if (ruta.length === 0) {
            return res.status(404).json({
                msg: "Ruta no encontrada"
            });
        }

        // 🔹 2. LUGARES ORDENADOS
        const [lugares] = await bdmysql.query(`
            SELECT l.*, rl.orden
            FROM ruta_lugar rl
            JOIN lugar l ON rl.id_lugar = l.id_lugar
            WHERE rl.id_ruta = ?
            ORDER BY rl.orden ASC
        `, {
            replacements: [id]
        });

        // 🔹 3. MULTIMEDIA POR CADA LUGAR
        for (let lugar of lugares) {

            const [multimedia] = await bdmysql.query(`
                SELECT cm.*
                FROM contenido_multimedia cm
                JOIN lugar_multimedia lm 
                ON cm.id_contenido_multimedia = lm.id_contenido_multimedia
                WHERE lm.id_lugar = ?
            `, {
                replacements: [lugar.id_lugar]
            });

            lugar.multimedia = multimedia;
        }

        res.json({
            ruta: ruta[0],
            lugares
        });

    } catch (error) {

        res.status(500).json({
            msg: "Error obteniendo detalle de la ruta",
            error
        });

    }

};

// ===============================
// GET RUTA POR ID
// ===============================
const rutaIdGet = async (req, res) => {

    const { id } = req.params;

    const ruta = await Ruta.findByPk(id);

    if (!ruta) {
        return res.status(404).json({
            msg: "Ruta no encontrada"
        });
    }

    res.json(ruta);

};


// ===============================
// BUSCAR RUTA POR NOMBRE
// ===============================
const rutaNombreGet = async (req, res) => {

    const { nombre } = req.params;

    const rutas = await Ruta.findAll({
        where: {
            nombre: {
                [Op.like]: `%${nombre}%`
            }
        }
    });

    res.json(rutas);

};


// ===============================
// OBTENER RUTAS POR USUARIO
// ===============================
const rutasPorUsuario = async (req, res) => {

    const { id_usuario } = req.params;

    const rutas = await Ruta.findAll({
        where: { id_usuario }
    });

    res.json(rutas);

};


// ===============================
// CREAR RUTA
// ===============================
const crearRuta = async (req, res) => {

    try {

        const ruta = await Ruta.create(req.body);

        res.json({
            msg: "Ruta creada",
            ruta
        });

    } catch (error) {

        res.status(500).json({
            msg: "Error al crear ruta",
            error
        });

    }

};


// ===============================
// ACTUALIZAR RUTA
// ===============================
const actualizarRuta = async (req, res) => {

    const { id } = req.params;

    const ruta = await Ruta.findByPk(id);

    if (!ruta) {
        return res.status(404).json({
            msg: "Ruta no existe"
        });
    }

    await ruta.update(req.body);

    res.json({
        msg: "Ruta actualizada",
        ruta
    });

};


// ===============================
// ELIMINAR RUTA
// ===============================
const eliminarRuta = async (req, res) => {

    const { id } = req.params;

    const ruta = await Ruta.findByPk(id);

    if (!ruta) {
        return res.status(404).json({
            msg: "Ruta no existe"
        });
    }

    await ruta.destroy();

    res.json({
        msg: "Ruta eliminada"
    });

};


module.exports = {
    rutasGet,
    rutaIdGet,
    rutaNombreGet,
    rutasPorUsuario,
    crearRuta,
    actualizarRuta,
    detalleRuta,
    eliminarRuta
};