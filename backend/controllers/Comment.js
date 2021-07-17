const { Post, User, Comment } = require('../models/index');


exports.createComment = (req, res, next) => {
    
    const commentObject =  JSON.parse(req.body.comment);
    commentObject.UserId = req.token.userId;
    Comment.create(commentObject)
    .then( () => res.status(200).json({ message: 'Commentaire crée !' }))
    .catch(error => res.status(400).json({ error }));
}



exports.deleteComment = (req, res, next) => { 
    Comment.findOne({
        where: { id: req.params.id}
    })
    .then( comment => {
        if (comment.UserId == req.token.userId || req.token.isAdmin){
            comment.destroy()
            .then( () => res.status(200).json({ message: 'commentaire supprimé !'}))
            .catch( error => res.status(400).json({ error }));
        }
    })
    .catch( error => res.status(400).json({ error }));
}