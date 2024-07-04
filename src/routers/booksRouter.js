const express = require('express');
const booksController = require('../controllers/booksController');

const router = express.Router();

router.route('/')
    .get(booksController.getBooks)
    .post(booksController.createBook)
    .put(booksController.updateBook);

router.route('/:bookId')
    .get(booksController.getBookById)
    .delete(booksController.deleteBook);

module.exports = router;