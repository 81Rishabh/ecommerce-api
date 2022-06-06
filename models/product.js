const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
   name : {
       type : String,
       required : true
   },
   qty : {
       type : Number,
       required : true,
       defaultValue : 1
   }
} , {timestamps : true});


const Product = mongoose.model('Products' , ProductSchema);
module.exports = Product;