const express = require('express');

const booksController = require('../controllers/booksController');
const { validateBook } = require('../middlewares/validate.mw');

const router = express.Router();

router.route('/')
    .get(booksController.getBooks)
    .post(validateBook, booksController.createBook)
    .put(validateBook, booksController.updateBook);

router.route('/:bookId')
    .get(booksController.getBookById)
    .delete(booksController.deleteBook);

module.exports = router;