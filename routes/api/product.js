const express = require('express');
const router = express.Router();
const productController = require('../../controller/api/product');

// @get request to get product
router.get('/' , productController.getProduct);

// @post request to create product
router.post('/create', productController.create);

// @delete requesst to delete product
router.delete('/:id' , productController.delete);

// @put request to edit the quantity
router.put('/:id/update_qty' , productController.edit);

module.exports = router;