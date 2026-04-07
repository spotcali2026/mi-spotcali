const { LugarMultimedia } = require('../models/lugar_multimedia.model');


// =============================
// OBTENER TODAS LAS RELACIONES
// =============================
const lugarMultimediaGet = async (req, res) => {

    const relaciones = await LugarMultimedia.findAll();

    res.json(relaciones);

};


// =============================
// OBTENER MULTIMEDIA DE UN LUGAR
// =============================
const multimediaPorLugar = async (req, res) => {

    const { id_lugar } = req.params;

    const multimedia = await LugarMultimedia.findAll({
        where: { id_lugar }
    });

    res.json(multimedia);

};


// =============================
// ASIGNAR MULTIMEDIA A LUGAR
// =============================
const crearRelacion = async (req, res) => {

    const relacion = await LugarMultimedia.create(req.body);

    res.json({
        msg: "Multimedia asignada al lugar",
        relacion
    });

};


// =============================
// ELIMINAR RELACION
// =============================
const eliminarRelacion = async (req, res) => {

    const { id_lugar, id_contenido_multimedia } = req.params;

    const relacion = await LugarMultimedia.findOne({
        where: { id_lugar, id_contenido_multimedia }
    });

    if(!relacion){
        return res.status(404).json({
            msg: "Relación no encontrada"
        });
    }

    await relacion.destroy();

    res.json({
        msg: "Relación eliminada"
    });

};

module.exports = {
    lugarMultimediaGet,
    multimediaPorLugar,
    crearRelacion,
    eliminarRelacion
};