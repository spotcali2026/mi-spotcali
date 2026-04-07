const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/mySqlConnection');

const Lugar = bdmysql.define('lugar', {

    id_lugar: {
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

    latitud: {
        type: DataTypes.DECIMAL(10,8),
        allowNull: false
    },

    longitud: {
        type: DataTypes.DECIMAL(11,8),
        allowNull: false
    }

}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = {
    Lugar
};