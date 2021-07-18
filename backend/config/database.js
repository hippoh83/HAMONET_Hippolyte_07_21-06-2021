require('dotenv').config();
const Sequelize = require('sequelize');


const db = new Sequelize(`${process.env.dbName}`, `${process.env.User}`, `${process.env.UserPassword}`, {
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