const { Router } = require('express');

const {
    favoritosGet,
    favoritosPorUsuario,
    agregarFavorito,
    actualizarCalificacion,
    eliminarFavorito
} = require('../controller/usuario_lugar_favorito.controller');

const router = Router();

router.get('/', favoritosGet);
router.get('/usuario/:id', favoritosPorUsuario);

router.post('/', agregarFavorito);

router.put('/:id_usuario/:id_lugar', actualizarCalificacion);

router.delete('/:id_usuario/:id_lugar', eliminarFavorito);

module.exports = router;