const express = require('express');
const router = express.Router();
const userController = require('./controllers/user.controller');
const productController = require('./controllers/product.controller');
const ordersController = require('./controllers/order.controller');

//user CRUD
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/checkIfIdExist/:userId', userController.checkIfIdExist);


//Categoris
router.get('/categories', productController.getCategories);

// PRODUCT CRUD
router.get('/products', productController.list);
router.post('/products' ,productController.addNewProduct);
// PRODUCT CRUD
router.post('/orders/check', ordersController.orderCheck);
router.post('/orders', ordersController.create);
module.exports = router;
