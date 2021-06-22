const Sequelize = require('sequelize');
const db = require('../config/database');

const postSchema = db.define('Posts', {
    user_id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    name: { type: Sequelize.STRING, allowNull: false },
    description : { type: Sequelize.TEXT, allowNull: false},
    imageUrl : { type: Sequelize.STRING, allowNull: false},
    usersComments : { type: Sequelize.TEXT, allowNull: true},
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

module.exports = postSchema;