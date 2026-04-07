const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/mySqlConnection');

const UsuarioLugarFavorito = bdmysql.define('usuario_lugar_favorito', {

    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    id_lugar: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    calificacion: {
        type: DataTypes.INTEGER,
        allowNull: true
    }

}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = {
    UsuarioLugarFavorito
};