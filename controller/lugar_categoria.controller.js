const { LugarCategoria } = require('../models/lugar_categoria.model');


// ===============================
// GET TODAS LAS RELACIONES
// ===============================
const lugarCategoriaGet = async (req, res) => {

    const relaciones = await LugarCategoria.findAll();

    res.json(relaciones);
};


// ===============================
// GET CATEGORIAS DE UN LUGAR
// ===============================
const categoriasPorLugar = async (req, res) => {

    const { id_lugar } = req.params;

    const categorias = await LugarCategoria.findAll({
        where: { id_lugar }
    });

    res.json(categorias);
};


// ===============================
// GET LUGARES DE UNA CATEGORIA
// ===============================
const lugaresPorCategoria = async (req, res) => {

    const { id_categoria } = req.params;

    const lugares = await LugarCategoria.findAll({
        where: { id_categoria }
    });

    res.json(lugares);
};


// ===============================
// CREAR RELACION
// ===============================
const crearRelacion = async (req, res) => {

    try {

        const relacion = await LugarCategoria.create(req.body);

        res.json({
            msg: "Relación creada",
            relacion
        });

    } catch (error) {

        res.status(500).json({
            msg: "Error al crear relación",
            error
        });

    }

};


// ===============================
// ELIMINAR RELACION
// ===============================
const eliminarRelacion = async (req, res) => {

    const { id_lugar, id_categoria } = req.params;

    const relacion = await LugarCategoria.findOne({
        where: { id_lugar, id_categoria }
    });

    if (!relacion) {
        return res.status(404).json({
            msg: "Relación no existe"
        });
    }

    await relacion.destroy();

    res.json({
        msg: "Relación eliminada"
    });

};


module.exports = {
    lugarCategoriaGet,
    categoriasPorLugar,
    lugaresPorCategoria,
    crearRelacion,
    eliminarRelacion
};