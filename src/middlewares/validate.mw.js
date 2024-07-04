const schemas = require('../utils/validationSchemas');

module.exports.validateAuthor = async (req, res, next) => {
    const {body} = req;

    try {
        const validatedAuthor = await schemas.AUTHOR_VALIDATION_SCHEMA
            .validate(body, {abortEarly: false});
        req.body = validatedAuthor;
        next();
    } catch (err) {
        next(err);
    }
}

module.exports.validateBook = async (req, res, next) => {
    const {body} = req;

    try {
        const validatedBook = await schemas.BOOK_VALIDATION_SCHEMA
            .validate(body, {abortEarly: false});
        req.body = validatedBook;
        next();
    } catch (err) {
        next(err);
    }
}

module.exports.validateCustomer = async (req, res, next) => {
    const {body} = req;

    try {
        const validatedCustomer = await schemas.CUSTOMER_VALIDATION_SCHEMA
            .validate(body, {abortEarly: false});
        req.body = validatedCustomer;
        next();
    } catch (err) {
        next(err);
    }
}