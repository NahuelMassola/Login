const mongoose = require('mongoose')
const mongoosepagination = require ('mongoose-paginate-v2')

const productsCollection = 'products'
const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,  
    },
    description: {
        type: String,
        required: true, 
    },
    code:{
        type: String,
        require: true, 
    },
    price:{
        type: Number,
        required: true, 
    },
    status:Boolean,
    stock: {
        type: Number,
        default:1,
    },    
    category:{
        type: String,
        required: true, 
    },
    thumbnail:String,
} , {
    versionKey: false,
    timestamps:true
})
productSchema.plugin(mongoosepagination)
const productModel = mongoose.model(productsCollection, productSchema);

module.exports = productModel;