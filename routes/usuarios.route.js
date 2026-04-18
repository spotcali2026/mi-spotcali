const { Router } = require('express');

const {
    usuariosGet,
    usuarioIdGet,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
} = require('../controller/usuarios.controller');

const router = Router();

router.get('/', usuariosGet);
router.get('/:id', usuarioIdGet);
router.post('/login', loginUsuario);
router.post('/', crearUsuario);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;