const joi = require('joi');

const {RegexpEnum} = require('../../constants');

module.exports = joi.object({
    email: joi.string().trim().regex(RegexpEnum.email).required(),
    password: joi.string().trim().regex(RegexpEnum.password).required()
});
