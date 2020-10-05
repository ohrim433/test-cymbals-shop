const {ErrorHandler} = require('../../errors');
const {ResponseStatusCodesEnum} = require('../../constants');
const {singlePasswordValidationSchema} = require('../../validators');

module.exports = (req, res, next) => {
    const {error} = singlePasswordValidationSchema.validate(req.body);

    if (error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
    }

    next();
};
