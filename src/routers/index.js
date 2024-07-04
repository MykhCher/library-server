const express = require('express');

const authorRouter = require('./authorRouter');
const booksRouter = require('./booksRouter');
const customersRouter = require('./customersRouter');


const router = express.Router();

router.use('/authors', authorRouter);
router.use('/books', booksRouter);
router.use('/customers', customersRouter);

module.exports = router;