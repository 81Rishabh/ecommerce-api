const express = require('express');
const router = express.Router();


// root routes for user
router.use('/user' , require('./users'));

// root routes for order
router.use('/orders'  , require('./orders'));


module.exports = router;