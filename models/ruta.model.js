const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/mySqlConnection');

const Ruta = bdmysql.define('ruta', {

    id_ruta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = {
    Ruta
};