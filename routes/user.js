const express = require('express');
const router = express.Router();
const user = require('../controller/user');
const {UserValidator} = require('../Validator/validator')

router.post('/',user.getUserDetail);
router.post('/register',UserValidator,user.register);
router.post('/login',user.login);
router.patch('/update',user.updateUserrank);

module.exports=router;