require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const rateLimit = require("express-rate-limit");
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');
const { loadModels } = require('./models/index');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(bodyParser.json());
app.use(limiter);




loadModels();

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/post', postRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/comment', commentRoutes);
//ou api/post/comment ??



module.exports = app;