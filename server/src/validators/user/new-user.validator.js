const joi = require('joi');

const {GenderEnum, RegexpEnum} = require('../../constants');

module.exports = joi.object({
    age: joi.number().integer().min(1).max(120).required(),
    email: joi.string().trim().regex(RegexpEnum.email).required(),
    gender: joi.string().trim().allow(GenderEnum.FEMALE, GenderEnum.MALE),
    name: joi.string().trim().min(2).max(50).required(),
    password: joi.string().trim().regex(RegexpEnum.password).required(),
    phone: joi.string().trim().regex(RegexpEnum.phone),
    surname: joi.string().trim().min(2).max(50).required()
});
