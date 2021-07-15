const Sequelize = require('sequelize');


const db = new Sequelize('groupomaniadb', 'hippo', '@Wergeronbak1', {
    host: 'localhost',
    dialect: 'mysql'
  });

  db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error(err);
  });

  module.exports = db;