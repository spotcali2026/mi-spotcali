const { Router } = require('express');

const {
    multimediaGet,
    multimediaIdGet,
    crearMultimedia,
    eliminarMultimedia
} = require('../controller/contenido_multimedia.controller');

const router = Router();

router.get('/', multimediaGet);
router.get('/:id', multimediaIdGet);

router.post('/', crearMultimedia);
router.delete('/:id', eliminarMultimedia);

module.exports = router;