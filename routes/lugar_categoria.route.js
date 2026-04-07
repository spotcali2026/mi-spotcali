const { Router } = require('express');

const {
    lugarCategoriaGet,
    categoriasPorLugar,
    lugaresPorCategoria,
    crearRelacion,
    eliminarRelacion
} = require('../controller/lugar_categoria.controller');

const router = Router();

router.get('/', lugarCategoriaGet);

// categorías de un lugar
router.get('/lugar/:id_lugar', categoriasPorLugar);

// lugares de una categoría
router.get('/categoria/:id_categoria', lugaresPorCategoria);

router.post('/', crearRelacion);

router.delete('/:id_lugar/:id_categoria', eliminarRelacion);

module.exports = router;