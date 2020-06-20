const express = require('express');
const router = express.Router();
const comment = require('../controller/comment');
const jwt_decode = require('jwt-decode')
const admin = require('../controller/admin');

router.post('/insert',comment.createcomment);
router.get('/get-data',comment.getcomment);
router.delete('/:deleteid',comment.deletecomment);

module.exports=router;

