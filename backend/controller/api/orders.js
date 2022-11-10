const Orders = require('../../models/Orders');
const ErrorResponse = require('../../utils/ErrorResponse');

// controller for getting all the product
module.exports.getOrders = async function(req, res,next) {
  let userId = req.params.user_id;
   try {
        let order = await Orders.find({user_id : userId});
       
        if(order) {
            return res.status(200).json({
                success: true,
                data : order
            });
        }
        else {
           return next(new ErrorResponse('Order not found' , 404));
        }
   } catch (error) {
      return res.status(500).json({message: error.message});
   }
}

// controller for creating product
module.exports.createOrders = async function(req,res,next){
    try {
       let order = await Orders.create(req.body);
        return res.status(201).json({
            success: true,
            message : 'product created successfully',
            data : order
        });
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}
