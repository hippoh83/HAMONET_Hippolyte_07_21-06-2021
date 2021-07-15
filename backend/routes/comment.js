const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/Comment');
const auth= require('../middleware/auth');


router.post('/', auth, commentCtrl.createComment);
router.delete('/:id', auth, commentCtrl.deleteComment);



module.exports = router;