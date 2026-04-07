const { Router } = require('express');

const {
    rutasLugarGet,
    lugaresPorRuta,
    agregarLugarRuta,
    actualizarOrden,
    eliminarLugarRuta
} = require('../controller/ruta_lugar.controller');

const router = Router();

router.get('/', rutasLugarGet);
router.get('/ruta/:id', lugaresPorRuta);

router.post('/', agregarLugarRuta);

router.put('/:id_ruta/:id_lugar', actualizarOrden);

router.delete('/:id_ruta/:id_lugar', eliminarLugarRuta);

module.exports = router;