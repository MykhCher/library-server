const express = require('express');

const customersController = require('../controllers/customersController');
const { validate: {validateCustomer} } = require('../middlewares');

const router = express.Router();

router.route('/')
    .get(customersController.getCustomers)
    .post(validateCustomer, customersController.createCustomer)
    .put(validateCustomer, customersController.updateCustomer);

router.route('/:customerId')
    .get(customersController.getCustomerById)
    .delete(customersController.deleteCustomer);

module.exports = router;