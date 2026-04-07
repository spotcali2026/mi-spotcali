const { RutaCompartida } = require('../models/ruta_compartida.model');
const { bdmysql } = require('../database/mySqlConnection');

// ===============================
// GET TODAS LAS RUTAS COMPARTIDAS
// ===============================
const rutasCompartidasGet = async (req, res) => {

    const rutas = await RutaCompartida.findAll();

    res.json(rutas);
};

// ===============================
// GET POR ID
// ===============================
const rutaCompartidaIdGet = async (req, res) => {

    const { id } = req.params;

    const ruta = await RutaCompartida.findByPk(id);

    if (!ruta) {
        return res.status(404).json({
            msg: "Ruta compartida no encontrada"
        });
    }

    res.json(ruta);
};

// ===============================
// CREAR
// ===============================
const crearRutaCompartida = async (req, res) => {

    try {

        const ruta = await RutaCompartida.create(req.body);

        res.json({
            msg: "Ruta compartida creada",
            ruta
        });

    } catch (error) {

        res.status(500).json({
            msg: "Error al crear ruta compartida",
            error
        });

    }

};

// ===============================
// ACTUALIZAR
// ===============================
const actualizarRutaCompartida = async (req, res) => {

    const { id } = req.params;

    const ruta = await RutaCompartida.findByPk(id);

    if (!ruta) {
        return res.status(404).json({
            msg: "Ruta compartida no existe"
        });
    }

    await ruta.update(req.body);

    res.json({
        msg: "Ruta compartida actualizada",
        ruta
    });

};

// ===============================
// ELIMINAR
// ===============================
const eliminarRutaCompartida = async (req, res) => {

    const { id } = req.params;

    const ruta = await RutaCompartida.findByPk(id);

    if (!ruta) {
        return res.status(404).json({
            msg: "Ruta compartida no existe"
        });
    }

    await ruta.destroy();

    res.json({
        msg: "Ruta compartida eliminada"
    });

};

// ===============================
// GET POR USUARIO
// ===============================
const rutasPorUsuario = async (req, res) => {

    const { id } = req.params;

    const rutas = await RutaCompartida.findAll({
        where: {
            id_usuario: id
        }
    });

    res.json(rutas);
};

// ===============================
// GET SOLO PUBLICAS
// ===============================
const rutasPublicas = async (req, res) => {

    const rutas = await RutaCompartida.findAll({
        where: {
            es_publica: true
        }
    });

    res.json(rutas);
};

module.exports = {
    rutasCompartidasGet,
    rutaCompartidaIdGet,
    crearRutaCompartida,
    actualizarRutaCompartida,
    eliminarRutaCompartida,
    rutasPorUsuario,
    rutasPublicas
};