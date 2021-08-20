const Sequelize = require('sequelize');
const db = require('../config/database');

const Post = db.define('Posts', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: true
    },
});

module.exports = Post;