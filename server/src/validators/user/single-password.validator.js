const joi = require('joi');

const {RegexpEnum} = require('../../constants');

module.exports = joi.object({
    password: joi.string().trim().regex(RegexpEnum.password).required()
});
