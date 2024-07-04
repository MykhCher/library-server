const express = require('express');
const authorController = require('../controllers/authorController');

const router = express.Router();

router.route('/')
    .get(authorController.getAuthors)
    .post(authorController.createAuthor)
    .put(authorController.updateAuthor);

router.route('/:authorId')
    .get(authorController.getAuthorById)
    .delete(authorController.deleteAuthor);

module.exports = router;