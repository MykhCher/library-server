const express = require('express');

const authorRouter = require('./authorRouter');
const booksRouter = require('./booksRouter');
const router = express.Router();

router.use('/authors', authorRouter);
router.use('/books', booksRouter);

module.exports = router;