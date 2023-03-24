const mongoose = require('mongoose')

const chatsSchema = new mongoose.Schema({
	userEmail: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
} , {
    versionKey: false,
    timestamps:true
})
const chatsModel = mongoose.model('messages', chatsSchema )

module.exports = chatsModel