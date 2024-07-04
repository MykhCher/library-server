const express = require('express');
const morgan = require('morgan');
const { errorHandlers : {validationErrorHandler, errorHandler}} = require('./middlewares');

const router = require('./routers');


const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/api', router);
app.use(validationErrorHandler, errorHandler);


module.exports = app;
