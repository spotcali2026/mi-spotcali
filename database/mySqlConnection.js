const { Sequelize } = require('sequelize');

const bdmysql = new Sequelize(
  'u220837946_spotcali_app',
  'u220837946_spotcali_user',
  'SpotCali2026',
  {
    host: 'auth-db1978.hstgr.io',
    dialect: 'mysql',
    port: 3306
  }
);

module.exports = {
    bdmysql
};