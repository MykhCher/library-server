const express = require('express');

const authorRouter = require('./authorRouter');
const router = express.Router();

router.use('/authors', authorRouter);

module.exports = router;