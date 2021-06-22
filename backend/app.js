require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');

const db = require('./config/database')
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error(err);
  });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/post', postRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/comment', commentRoutes);



module.exports = app;