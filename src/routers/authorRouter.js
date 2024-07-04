const express = require('express');

const authorController = require('../controllers/authorController');
const { validateAuthor } = require('../middlewares/validate.mw');


const router = express.Router();

router.route('/')
    .get(authorController.getAuthors)
    .post(validateAuthor, authorController.createAuthor)
    .put(validateAuthor, authorController.updateAuthor);

router.route('/:authorId')
    .get(authorController.getAuthorById)
    .delete(authorController.deleteAuthor);

module.exports = router;