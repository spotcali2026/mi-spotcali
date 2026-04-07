const { Usuario } = require('../models/usuario.model');

const usuariosGet = async (req, res) => {

    const usuarios = await Usuario.findAll();

    res.json(usuarios);
}

const usuarioIdGet = async (req, res) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if(!usuario){
        return res.status(404).json({
            msg: "Usuario no encontrado"
        });
    }

    res.json(usuario);
}

const crearUsuario = async (req, res) => {

    const usuario = await Usuario.create(req.body);

    res.json({
        msg: "Usuario creado",
        usuario
    });
}

const actualizarUsuario = async (req, res) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if(!usuario){
        return res.status(404).json({
            msg: "Usuario no existe"
        });
    }

    await usuario.update(req.body);

    res.json({
        msg: "Usuario actualizado",
        usuario
    });
}

const eliminarUsuario = async (req, res) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if(!usuario){
        return res.status(404).json({
            msg: "Usuario no existe"
        });
    }

    await usuario.destroy();

    res.json({
        msg: "Usuario eliminado"
    });
}

module.exports = {
    usuariosGet,
    usuarioIdGet,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}