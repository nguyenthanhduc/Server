const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const Payment = require('../models/payment');

exports.createpayment = async (req,res) => {

	const today = new Date();
	const {customerid , paymentid, date, total} = req.body;
	console.log(req.body);
    const payment = new Payment(
        {
            customerid:customerid,
            paymentid: paymentid,
            date:today,
            total:total
        }
    );
    try {
        const savePayment = await payment.save();
        res.json(savePayment);
    } catch (err) {
        res.json({ message: err })
    }
}

exports.getpayment = async (req,res) => {
    console.log("OK");
    try 
    {
        res.json("OK");
    } 
    catch (err) {
        res.json({ message: err })
    }
}
