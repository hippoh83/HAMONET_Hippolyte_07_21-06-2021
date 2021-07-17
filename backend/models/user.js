const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('Users', {
    userName : { type: Sequelize.STRING, allowNull: false, unique: true},
    email : { type: Sequelize.STRING, allowNull: false, unique: true},
    password : { type : Sequelize.STRING, allowNull: false },
    isAdmin : { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false}
});

module.exports = User;