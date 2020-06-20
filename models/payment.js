const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('./product');
const PaymentSchema = new Schema({
	customerid: {
		type: String,
		require: true
	},
	paymentid: {
		type: String,
		require: true
	},
	fullname: {
		type: String,
		require: true
	},
	gmail: {
		type: String,
		require: true
	},
	phone: {
		type: String,
		require: true
	},
	address: {
		type: String,
		require: true
	},
	more: {
		type: String
	},
	cart: {
		type: {Product}
	},
	date: {
		type: Date,
		default: Date.now
	},
	total: {
		type: Number,
		require: true
	},
	status: {
		type: String,
		require: true
	}
})

module.exports = payment = mongoose.model('Payment',PaymentSchema)