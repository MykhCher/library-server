const yup = require('yup');

const nameScheme = yup.string().trim().min(2).max(255).required();
const emailScheme = yup.string().email().trim().min(5).max(255).required();


module.exports.AUTHOR_VALIDATION_SCHEMA = yup.object().shape({
    full_name: nameScheme,
    email: emailScheme,
    nationality: yup
        .string()
        .trim()
        .min(2)
        .max(3)
        .nullable()
});

module.exports.BOOK_VALIDATION_SCHEMA = yup.object().shape({
    title: nameScheme,
    description: yup
        .string()
        .trim()
        .min(5)
        .nullable(),
});

module.exports.CUSTOMER_VALIDATION_SCHEMA = yup.object().shape({
    full_name: nameScheme,
    email: emailScheme,
    phone: yup
        .string()
        .trim()
        .matches(/^\+?\d{6,20}$/)
        .nullable(),
});

