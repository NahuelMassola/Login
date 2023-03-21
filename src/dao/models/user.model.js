const mongoose = require('mongoose')
const userCollection = ('users')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true
    }
} , {
    versionKey: false,
    timestamps:true
})

const userModel = mongoose.model(userCollection , userSchema);

module.exports = userModel;