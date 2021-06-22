const Sequelize = require('sequelize');


module.exports = new Sequelize('groupomaniadb', 'hippo', '@Wergeronbak1', {
    host: 'localhost',
    dialect: 'mysql'
  });