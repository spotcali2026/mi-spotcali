const { RutaLugar } = require('../models/ruta_lugar.model');
const { bdmysql } = require('../database/mySqlConnection');

// ===============================
// GET TODOS
// ===============================
const rutasLugarGet = async (req, res) => {

    const data = await RutaLugar.findAll({
        order: [['orden', 'ASC']]
    });

    res.json(data);
};

// ===============================
// GET LUGARES POR RUTA (ORDENADOS)
// ===============================
const lugaresPorRuta = async (req, res) => {

    const { id } = req.params;

    try {

        const [results] = await bdmysql.query(`
            SELECT l.*, rl.orden
            FROM ruta_lugar rl
            JOIN lugar l ON rl.id_lugar = l.id_lugar
            WHERE rl.id_ruta = ?
            ORDER BY rl.orden ASC
        `, {
            replacements: [id]
        });

        res.json(results);

    } catch (error) {

        res.status(500).json({
            msg: "Error obteniendo lugares de la ruta",
            error
        });

    }

};

// ===============================
// AGREGAR LUGAR A RUTA
// ===============================
const agregarLugarRuta = async (req, res) => {

    try {

        const data = await RutaLugar.create(req.body);

        res.json({
            msg: "Lugar agregado a la ruta",
            data
        });

    } catch (error) {

        res.status(500).json({
            msg: "Error al agregar lugar a la ruta",
            error
        });

    }

};

// ===============================
// ACTUALIZAR ORDEN
// ===============================
const actualizarOrden = async (req, res) => {

    const { id_ruta, id_lugar } = req.params;

    const registro = await RutaLugar.findOne({
        where: { id_ruta, id_lugar }
    });

    if (!registro) {
        return res.status(404).json({
            msg: "Registro no encontrado"
        });
    }

    await registro.update(req.body);

    res.json({
        msg: "Orden actualizado",
        registro
    });

};

// ===============================
// ELIMINAR
// ===============================
const eliminarLugarRuta = async (req, res) => {

    const { id_ruta, id_lugar } = req.params;

    const registro = await RutaLugar.findOne({
        where: { id_ruta, id_lugar }
    });

    if (!registro) {
        return res.status(404).json({
            msg: "Registro no existe"
        });
    }

    await registro.destroy();

    res.json({
        msg: "Lugar eliminado de la ruta"
    });

};

module.exports = {
    rutasLugarGet,
    lugaresPorRuta,
    agregarLugarRuta,
    actualizarOrden,
    eliminarLugarRuta
};