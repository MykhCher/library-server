const express = require('express');

const booksController = require('../controllers/booksController');
const { validate: {validateBook} } = require('../middlewares');

const router = express.Router();

router.route('/')
    .get(booksController.getBooks)
    .post(validateBook, booksController.createBook)
    .put(validateBook, booksController.updateBook);

router.route('/:bookId')
    .get(booksController.getBookById)
    .delete(booksController.deleteBook);

module.exports = router;