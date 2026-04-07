const { Router } = require('express');

const {
    categoriasGet,
    categoriaIdGet,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
} = require('../controller/categoria.controller');

const router = Router();

router.get('/', categoriasGet);

router.get('/:id', categoriaIdGet);

router.post('/', crearCategoria);router.put('/:id', actualizarCategoria);

router.delete('/:id', eliminarCategoria);

module.exports = router;