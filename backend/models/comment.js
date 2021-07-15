const Sequelize = require('sequelize');
const db = require('../config/database');

const Comment = db.define('Comments', {
    description : { type: Sequelize.TEXT, allowNull: false},
});

module.exports = Comment;