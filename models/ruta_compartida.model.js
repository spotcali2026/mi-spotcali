const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/mySqlConnection');

const RutaCompartida = bdmysql.define('ruta_compartida', {

    id_ruta_compartida: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    id_ruta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    fecha_compartida: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    es_publica: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = {
    RutaCompartida
};