const { Router } = require('express');

const {
    lugarMultimediaGet,
    multimediaPorLugar,
    crearRelacion,
    eliminarRelacion
} = require('../controller/lugar_multimedia.controller');

const router = Router();

router.get('/', lugarMultimediaGet);

router.get('/lugar/:id_lugar', multimediaPorLugar);

router.post('/', crearRelacion);

router.delete('/:id_lugar/:id_contenido_multimedia', eliminarRelacion);

module.exports = router;