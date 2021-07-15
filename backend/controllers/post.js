const { Post, User, Comment } = require('../models/index');
const fs = require('fs');
const { post } = require('../routes/post');


exports.createPost = (req,res, next) => {
    const postObject = JSON.parse(req.body.post);
    postObject.UserId = req.token.userId;
    if ( req.file != undefined ){
        postObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    Post.create( postObject )
    .then(()=> res.status(201).json({message: 'post enregistré'}))
    .catch(error => res.status(400).json({error}));
}

exports.modifyPost = (req,res, next) => {
    Post.findOne( { 
        where: { id: req.params.id}
    })
    .then( post => {
        if ( post.UserId == req.token.userId || req.token.isAdmin ){
            post = Object.assign(post, JSON.parse(req.body.post)); 
            post.UserId = req.token.userId;
            if ( req.file != undefined ){
                post.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            }
            post.save()
            .then(()=> res.status(201).json({message: 'post enregistré'}))
            .catch(error =>
                 res.status(400).json({error})
                 );
        }
    })
    .catch(err => 
        res.status(400).json({ err })
        );

}

exports.deletePost = (req,res, next) => {
    Post.findOne( { 
        where: { id: req.params.id}
    })
    .then( post => {
        if (post.UserId == req.token.userId || req.token.isAdmin ){
            post = Object.assign(post, JSON.parse(req.body.post)); 
            post.UserId = req.token.userId;
            if ( req.file != undefined ){
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    post.destroy()
                    .then(()=> res.status(201).json({message: 'post supprimé'}))
                    .catch(error =>
                         res.status(400).json({error})
                         );
                });
            } 
        }
    })
    .catch(err => 
        res.status(400).json({ err })
        );
    
}

exports.getOnePost = (req,res, next) => {
    Post.findOne( { 
        include: [User, { model: Comment, include: User }],
        where: { id: req.params.id}
    })
    .then( posts => res.status(200).json({ posts }))
    .catch(err => res.status(400).json({ err }));
      
}

exports.getAllPost = (req,res, next) => {
Post.findAll( { 
    include: [User, { model: Comment, include: User }]
})
.then( posts => res.status(200).json({ posts }))
.catch(err => res.status(400).json({ err }));
}

