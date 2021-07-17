require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      User.create({
        userName : req.body.userName,
        email: req.body.email,
        password: hash
      })
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

};

exports.login = (req, res, next) => {
    User.findOne({ where: { email: req.body.email} })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user.id,
              isAdmin: user.isAdmin,
              userName: user.userName,
              token: jwt.sign(
                { userId: user.id, isAdmin: user.isAdmin, userName: user.userName },
                process.env.TOKEN,
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(501).json({ error }));
};

exports.deleteAccount = (req, res, next) => {
  
    User.findOne({ where: { id : req.params.id } })
    .then(  user => {
      if (user.id == req.params.id || req.token.isAdmin) {
        user.destroy()
      .then(() => res.status(200).json({ message: "Utilisateur supprimé !"}))
      .catch(error => res.status(500).json({ error }));
      }
    })
      

    .catch( error => res.status(500).json({ error })); 
  
  
};