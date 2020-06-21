const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const Payment = require('../models/payment');

exports.createpayment = async (req,res) => {
	const today = new Date();
	const {customerid , paymentid, fullname, gmail, phone, address, more, cart, date, total, status} = req.body;
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
            total:total,
            status: status
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
    try 
    {
        const payment = await Payment.find();
        res.json(payment);
    } 
    catch (err) {
        res.json({ message: err })
    }
}

exports.updatepayment = async (req, res) => {
    try {
        const updatePayment = await Payment.updateOne(
            { paymentid: req.body.paymentid },
            {
                $set: {
                    status: req.body.status
                }
            }
        );
        res.json(updatePayment);
    } catch (err) {
        res.json({ message: err })
    }
}

exports.getpaymentdetail = async(req,res)=>{
    try 
    {
        console.log(req.body);
        const payment= await Payment.findById(req.body.paymentid);
        if (!payment) res.json({error: "Payment does not exist"})
        else{
            res.send(payment);
        }
        console.log(payment);
    } 
    catch (err) {
        res.json({ message: err })
    }
}