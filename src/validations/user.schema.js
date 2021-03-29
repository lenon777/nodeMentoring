const Joi = require('joi');

module.exports = Joi.object().keys({
    login: Joi.string()
        .required()
        .email({ tlds: { allow: false } }),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])'))
        .required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});
