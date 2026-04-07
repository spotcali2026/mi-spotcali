const { Router } = require('express');

const {
    rutasGet,
    rutaIdGet,
    rutaNombreGet,
    rutasPorUsuario,
    crearRuta,
    actualizarRuta,
    detalleRuta,
    eliminarRuta
} = require('../controller/ruta.controller');

const router = Router();

router.get('/', rutasGet); // todas las rutas

router.get('/buscar/:nombre', rutaNombreGet); // buscar por nombre

router.get('/usuario/:id_usuario', rutasPorUsuario); // rutas por usuario

router.get('/detalle/:id', detalleRuta);

router.get('/:id', rutaIdGet); // ruta por id

router.post('/', crearRuta); // crear

router.put('/:id', actualizarRuta); // actualizar

router.delete('/:id', eliminarRuta); // eliminar



module.exports = router;