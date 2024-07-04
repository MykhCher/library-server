const yup = require('yup');


module.exports.AUTHOR_VALIDATION_SCHEMA = yup.object().shape({
    full_name: yup
        .string()
        .trim()
        .min(2)
        .max(255)
        .required(),
    email: yup
        .string()
        .email()
        .trim()
        .min(5)
        .max(255)
        .required(),
    nationality: yup
        .string()
        .trim()
        .min(2)
        .max(3)
        .nullable()
});

module.exports.BOOK_VALIDATION_SCHEMA = yup.object().shape({
    title: yup
        .string()
        .trim()
        .min(1)
        .max(255)
        .required(),
    description: yup
        .string()
        .trim()
        .min(5)
        .nullable(),
});

module.exports.CUSTOMER_VALIDATION_SCHEMA = yup.object().shape({
    full_name: yup
        .string()
        .trim()
        .min(2)
        .max(255)
        .nullable(),
    email: yup
        .string()
        .email()
        .trim()
        .min(5)
        .max(255)
        .nullable(),
    phone: yup
        .string()
        .trim()
        .matches(/^\+\d{6,20}$/)
        .nullable(),
});

