require('dotenv').config();
const bcrypt = require('bcrypt');
const {Post, User, Comment } = require('../models/index');
const jwt = require('jsonwebtoken');
const AES = require('../AES');



exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      var encrypted = AES.encrypt(req.body.email);
      
      User.create({
          userName: req.body.userName,
          email: encrypted,
          password: hash
        })
        .then(() => res.status(201).json({
          message: 'Utilisateur créé !'
        }))
        .catch(error => res.status(400).json({
          error
        }));
    })
    .catch(error => res.status(500).json({
      error
    }));

};

exports.login = (req, res, next) => {
  var encrypted = AES.encrypt(req.body.email);
  User.findOne({
      where: {
        email: encrypted
      }
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          error: 'Utilisateur non trouvé !'
        });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({
              error: 'Mot de passe incorrect !'
            });
          }
          res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            userName: user.userName,
            token: jwt.sign({
                userId: user.id,
                isAdmin: user.isAdmin,
                userName: user.userName
              },
              process.env.TOKEN, {
                expiresIn: '24h'
              }
            )
          });
        })
        .catch(error => res.status(500).json({
          error
        }));
    })
    .catch(error => res.status(501).json({
      error
    }));
};

exports.deleteAccount = (req, res, next) => {

  User.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => res.status(200).json({
      message: 'utilisateur supprimé'
    }))
    .catch(error => res.status(501).json({
      error
    }));


};

exports.getAllUsers = (req, res, next) => {
  User.findAll()
  .then(user => {
   res.status(200).json({
     user
   })})
  .catch(error => res.status(501).json({
    error
  }));
}
