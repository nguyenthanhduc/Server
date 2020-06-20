const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const Payment = require('../models/payment');

exports.createpayment = async (req,res) => {
	const today = new Date();
	const {customerid , paymentid, fullname, gmail, phone, address, more, cart, date, total} = req.body;
	console.log(req.body);
    const payment = new Payment(
        {
            customerid:customerid,
            paymentid: paymentid,
            fullname: fullname,
            gmail: gmail,
            phone: phone,
            address: address,
            more: more,
            cart: cart,
            date:today,
            total:total
        }
    );
    console.log(payment);
    try {
        const savePayment = await payment.save();
        res.json(savePayment);
    } catch (err) {
        res.json({ message: err })
    }
}

exports.getpayment = async (req,res) => {
    try 
    {
        const payment = await Payment.find();
        res.json(payment);
    } 
    catch (err) {
        res.json({ message: err })
    }
}
