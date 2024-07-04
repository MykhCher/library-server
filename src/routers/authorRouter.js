const express = require('express');
const authorController = require('../controllers/authorController');

const router = express.Router();

router.route('/')
    .get(authorController.getAuthors);

router.route('/:authorId')
    .get(authorController.getAuthorById);

module.exports = router;