const express = require('express');
const morgan = require('morgan');
const { errorHandlers : {validationErrorHandler, errorHandler}} = require('./middlewares');

const router = require('./routers');


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(validationErrorHandler, errorHandler);

app.use('/api', router);

module.exports = app;
