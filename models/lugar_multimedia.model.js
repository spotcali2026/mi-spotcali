const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/mySqlConnection');

const LugarMultimedia = bdmysql.define('lugar_multimedia', {

    id_lugar: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    id_contenido_multimedia: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }

},{
    tableName: 'lugar_multimedia',
    timestamps: false
});

module.exports = {
    LugarMultimedia
};