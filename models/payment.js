const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
	customerid: {
		type: String,
		require: true
	},
	paymentid: {
		type: String,
		require: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	total: {
		type: Number,
		require: true
	}
})

module.exports = payment = mongoose.model('Payment',PaymentSchema)