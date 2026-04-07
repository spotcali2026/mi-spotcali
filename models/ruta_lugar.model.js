const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/mySqlConnection');

const RutaLugar = bdmysql.define('ruta_lugar', {

    id_ruta: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    id_lugar: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    orden: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = {
    RutaLugar
};