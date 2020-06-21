const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const Comment = require('../models/comment');

exports.createcomment = async (req,res) => {
	const {customerid ,full_name, productid, newcomment} = req.body;
	console.log(req.body);
    const comment = new Comment(
        {
            customerid: customerid,
            full_name: full_name,
            productid: productid,
            comment: newcomment
        }
    );
    try {
        const saveComment = await comment.save();
        res.json(saveComment);
    } catch (err) {
        res.json({ message: err })
    }
}

exports.getcomment = async (req,res) => {
    try 
    {
        const comment = await Comment.find();
        res.json(comment);
    } 
    catch (err) {
        res.json({ message: err })
    }
}

exports.deletecomment = async (req, res) => {
    try {
        await Comment.deleteOne({ _id: req.params.deleteid });
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        res.json({ message: err })
    }
};