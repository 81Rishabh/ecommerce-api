const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
   user_id : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user',
    required : true
   },
   sub_total : {
     type : Number,
     default : 0
   },
   phone_number : {
     type : "String",
     required : true
   }
} , {timestamps : true});


const Orders = mongoose.model('orders' , OrderSchema);
module.exports = Orders;