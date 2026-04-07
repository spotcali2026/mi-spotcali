const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/mySqlConnection');

const Categoria = bdmysql.define('categoria', {

    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre_categoria: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = {
    Categoria
};