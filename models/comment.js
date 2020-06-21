const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	customerid: {
		type: String,
		require: true
	},
	full_name:{
		type: String,
		require: true
	},
	productid: {
		type: String,
		require: true
	},
	comment: {
		type: String,
		require: true
	}
})

module.exports = comment = mongoose.model('Comment',CommentSchema)