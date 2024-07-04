const express = require('express');
const customersController = require('../controllers/customersController');

const router = express.Router();

router.route('/')
    .get(customersController.getCustomers)
    .post(customersController.createCustomer)
    .put(customersController.updateCustomer);

router.route('/:customerId')
    .get(customersController.getCustomerById)
    .delete(customersController.deleteCustomer);

module.exports = router;