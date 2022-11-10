const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../../middileware/isAuthenticated');
const OrdersController = require('../../controller/api/orders');

// @get request to get Orders
router.get('/:user_id' ,isAuthenticated, OrdersController.getOrders);

// @post request to create Orders
router.post('/create', isAuthenticated, OrdersController.createOrders);



module.exports = router;