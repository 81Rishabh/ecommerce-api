const express = require('express');
const router = express.Router();
const UsersController = require('../../controller/api/users');

// @get request to get logged in user
router.get('/:id' , UsersController.getUser);

// @get request to get Orders
router.post('/login' , UsersController.login);

// @post request to create Orders
router.post('/create', UsersController.createUser);


module.exports = router;