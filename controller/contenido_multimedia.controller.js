const { ContenidoMultimedia } = require('../models/contenido_multimedia.model');

const multimediaGet = async (req, res) => {

    const multimedia = await ContenidoMultimedia.findAll();

    res.json(multimedia);
}

const multimediaIdGet = async (req, res) => {

    const { id } = req.params;

    const multimedia = await ContenidoMultimedia.findByPk(id);

    res.json(multimedia);
}

const crearMultimedia = async (req, res) => {

    const multimedia = await ContenidoMultimedia.create(req.body);

    res.json({
        msg: "Contenido multimedia creado",
        multimedia
    });
}

const eliminarMultimedia = async (req, res) => {

    const { id } = req.params;

    const multimedia = await ContenidoMultimedia.findByPk(id);

    await multimedia.destroy();

    res.json({
        msg: "Contenido eliminado"
    });
}

module.exports = {
    multimediaGet,
    multimediaIdGet,
    crearMultimedia,
    eliminarMultimedia
}