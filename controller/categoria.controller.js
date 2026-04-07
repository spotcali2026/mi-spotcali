const { Categoria } = require('../models/categoria.model');
const { Op } = require('sequelize');
const { bdmysql } = require('../database/mySqlConnection');

const categoriasGet = async (req, res) => {

    try {

        const [results] = await bdmysql.query(`
            SELECT * FROM categoria
        `);

        res.json({
            ok: true,
            categorias: results
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: "Error obteniendo categorías"
        });

    }

};

const categoriaIdGet = async(req,res)=>{

    const {id} = req.params;

    const categoria = await Categoria.findByPk(id);

    res.json(categoria);

}

const crearCategoria = async(req,res)=>{

    const categoria = await Categoria.create(req.body);

    res.json(categoria);

}

const actualizarCategoria = async(req,res)=>{

    const {id} = req.params;

    const categoria = await Categoria.findByPk(id);

    await categoria.update(req.body);

    res.json(categoria);

}

const eliminarCategoria = async(req,res)=>{

    const {id} = req.params;

    const categoria = await Categoria.findByPk(id);

    await categoria.destroy();

    res.json({
        msg:"Categoria eliminada"
    });

}

module.exports = {
    categoriasGet,
    categoriaIdGet,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
}