const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('Users', {
    email : { type: Sequelize.STRING, allowNull: false, unique: true},
    password : { type : Sequelize.STRING, allowNull: false },
    isAdmin : { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false}
});

module.exports = User;