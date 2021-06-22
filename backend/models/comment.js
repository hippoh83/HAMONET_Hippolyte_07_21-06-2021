const Sequelize = require('sequelize');
const db = require('../config/database');

const commentSchema = db.define('Comments', {
    user_id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    description : { type: Sequelize.TEXT, allowNull: false},
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

module.exports = commentSchema;