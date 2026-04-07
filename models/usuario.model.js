const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/mySqlConnection');

const Usuario = bdmysql.define('usuario', {

    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre: {
        type: DataTypes.STRING
    },

    correo: {
        type: DataTypes.STRING
    },

    contrasena: {
        type: DataTypes.STRING
    }

},{
    tableName: 'usuario',
    timestamps: false
});

module.exports = {
    Usuario
};