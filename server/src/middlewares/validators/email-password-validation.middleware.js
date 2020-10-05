const {emailPasswordValidationSchema} = require('../../validators');
const {ErrorHandler} = require('../../errors');
const {ResponseStatusCodesEnum} = require('../../constants');

module.exports = (req, res, next) => {
    const {error} = emailPasswordValidationSchema.validate(req.body);

    if (error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
    }

    next();
};
