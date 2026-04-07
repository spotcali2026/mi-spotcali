const { Router } = require('express');

const {
    rutasCompartidasGet,
    rutaCompartidaIdGet,
    crearRutaCompartida,
    actualizarRutaCompartida,
    eliminarRutaCompartida,
    rutasPorUsuario,
    rutasPublicas
} = require('../controller/ruta_compartida.controller');

const router = Router();

router.get('/', rutasCompartidasGet);
router.get('/publicas', rutasPublicas);
router.get('/usuario/:id', rutasPorUsuario);
router.get('/:id', rutaCompartidaIdGet);

router.post('/', crearRutaCompartida);
router.put('/:id', actualizarRutaCompartida);
router.delete('/:id', eliminarRutaCompartida);

module.exports = router;