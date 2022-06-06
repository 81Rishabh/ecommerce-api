const express = require('express');
const router = express.Router();
const productController = require('../../controller/api/product');

// @get request to get product
router.get('/products' , productController.getProduct);
router.use('/products' , require('../api/product'));


module.exports = router;