const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');


process.env.SECRET_KEY='secret';

exports.register = (req,res) => {
	const today = new Date();
	const UserData = {
		full_name: req.body.full_name,
		gmail: req.body.gmail,
		password: req.body.password,
		created: today,
		role: 'user',
		rank: req.body.rank,
		total: req.body.total
	};
	User.findOne({
		gmail: req.body.gmail
	})
	.then(user => {
		if(!user) {
			bcrypt.hash(req.body.password, 10, (err,hash) => {
				UserData.password = hash;
				User.create(UserData)
				.then(user => {
					res.json({status: user.gmail + ' registered!'})
				})
				.catch(err => {
					res.send('error :' + err);
				});
			})
		}else{
			res.json({error: 'User already exists'})
		}
	})
	.catch(err => {
		res.send('error: ' + err)
	})
};


exports.login = (req,res) => {
	User.findOne({
		gmail: req.body.gmail
	})
	.then(user => {
		if(user) {
			if(bcrypt.compareSync(req.body.password, user.password)) {
				const payload = {
					_id: user._id,
					full_name: user.full_name,
					gmail: user.gmail,
					role: user.role,
					rank: user.rank,
					total: user.total
				}
				let token = jwt.sign(payload, process.env.SECRET_KEY, {
					expiresIn: 1440
				})
				res.send(token);
			}else{
				res.json({error: "Wrong password"})
			}
		}else{
			res.json({error: "User does not exist"})
		}
	})
	.catch(err => {
		res.send('error: ' + err)
	})
};

exports.getUserDetail = async(req,res)=>{
	try 
    {
    	console.log(req.body);
		const user= await User.findById(req.body.customerid);
		if (!user) res.json({error: "User does not exist"})
		else{
			res.send(user);
		}
		console.log(user);
    } 
    catch (err) {
        res.json({ message: err })
    }
}

exports.updateUserrank = async (req, res) => {
	console.log(req.body);
	if(req.body.userid!=''){
		const user= await User.findById(req.body.userid);
		console.log(user);
	    var total = user.total + req.body.total;
	    var rank = user.rank;
	    if(rank=="bronze"&&total>=500000){
	    	rank="silver";
	    	total = total - 500000;
	    }
	    else if(rank=="silver"&&total>=5000000){
	    	rank = "gold";
	    	total = total - 5000000;
	    }
	    else if(rank=="gold"&&total>=10000000){
	    	rank=="diamond";
	    	total = total - 10000000;
	    }
	    const updateUser = await User.updateOne(
	        { _id: req.body.userid },
	        {
	            $set: {
	                rank: rank,
	                total: total
	            }
	        }
	    );
	    res.json(updateUser);
	}
}