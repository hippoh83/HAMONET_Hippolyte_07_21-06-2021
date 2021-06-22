const Sequelize = require('sequelize');
const db = require('../config/database');

const userSchema = db.define('Users', {
    user_id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    email : { type: Sequelize.STRING, allowNull: false},
    password : { type : Sequelize.STRING, allowNull: false }
});

module.exports = userSchema;