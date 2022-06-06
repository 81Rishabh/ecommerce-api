const Product = require('../../models/product');

// controller for get all the product
module.exports.getProduct = async function(req, res) {
   try {
        let product = await Product.find({});
        if(product) {
            return res.status(200).json({
                success: true,
                data : product
            });
        }
        else {
            return res.status(404).json({
                success: false,
                message : 'Product not found'
            });
        }
   } catch (error) {
      return res.status(500).json({message: error.message});
   }
}

module.exports.create = async function(req,res){
    try {
        await Product.create(req.body);
        return res.status(201).json({
            success: true,
            message : 'product created successfully'
        });
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

// controller for deleting product
module.exports.delete = async function(req, res) {
    // get id from url (http://localhost:3000/product/1234) 
    const productId = req.params.id;
   try {
       await Product.findByIdAndDelete(productId);
       return res.status(200).json({
           success: true,
           message : 'product deleted successfully'
       });
   } catch (error) {
        return res.status(500).json({
            error : error.message,
            message : "Internal server Error"
        });
   }
}

// controller for updating quantity
module.exports.edit = async function(req,res) {
    const {qty} = req.query;
    const productId = req.params.id;
    try {
         let product = await Product.findByIdAndUpdate(productId , {qty : qty});
        return res.status(200).json({
            success: true,
            message : 'Qty updated successfully',
            data : product
        });
    } catch (error) {
        return res.status(500).json({
            error : error.message,
            message : "Internal server Error"
        });
    }
}