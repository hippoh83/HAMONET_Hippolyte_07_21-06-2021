const User = require('./user');
const Comment = require('./comment');
const Post = require('./post');

const loadModels = async function () {
    Post.belongsTo(User, {
        onDelete: 'CASCADE',
    });
    Post.hasMany(Comment);
    Comment.belongsTo(User, {
        onDelete: 'CASCADE',
    });


    await User.sync({
        alter: true
    });
    await Post.sync({
        alter: true
    });
    await Comment.sync({
        alter: true
    });

}

module.exports = {
    User,
    Comment,
    Post,
    loadModels
};