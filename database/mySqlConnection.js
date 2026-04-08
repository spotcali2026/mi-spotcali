const { Sequelize } = require('sequelize');

const db = new Sequelize(
  'u220837946_spotcali_app',
  'u220837946_spotcali_user',
  'SpotCali2026',
  {
    host: 'mysql.hostinger.com',
    dialect: 'mysql',
    port: 3306
  }
);

module.exports = {
    bdmysql
};