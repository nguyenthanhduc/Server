const express = require('express');
const router = express.Router();
const payment = require('../controller/payment');
const jwt_decode = require('jwt-decode')

router.post('/insert',payment.createpayment);
router.get('/get-data',payment.getpayment);
module.exports=router;

