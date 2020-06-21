const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	full_name: {
		type: String
	},
	gmail: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	role: {
		type: String,
		require: true
	},
	rank: {
		type: String,
		require: true
	},
	total: {
		type: Number,
		require: true
	}
})

module.exports = user = mongoose.model('User',UserSchema)