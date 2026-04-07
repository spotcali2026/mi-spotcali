const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/mySqlConnection');

const LugarCategoria = bdmysql.define('lugar_categoria', {

    id_lugar: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }

}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = {
    LugarCategoria
};