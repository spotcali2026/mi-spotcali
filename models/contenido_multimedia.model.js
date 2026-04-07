const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/mySqlConnection');

const ContenidoMultimedia = bdmysql.define('contenido_multimedia', {

    id_contenido_multimedia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    titulo: {
        type: DataTypes.STRING
    },

    url: {
        type: DataTypes.STRING
    },

    formato: {
        type: DataTypes.STRING
    }

},{
    tableName: 'contenido_multimedia',
    timestamps: false
});

module.exports = {
    ContenidoMultimedia
};