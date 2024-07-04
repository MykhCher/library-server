const express = require('express');

const authorController = require('../controllers/authorController');
const { validate: {validateAuthor} } = require('../middlewares');


const router = express.Router();

router.route('/')
    .get(authorController.getAuthors)
    .post(validateAuthor, authorController.createAuthor)
    .put(validateAuthor, authorController.updateAuthor);

router.route('/:authorId')
    .get(authorController.getAuthorById)
    .delete(authorController.deleteAuthor);

module.exports = router;