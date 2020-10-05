const {ResponseStatusCodesEnum, UserStatusEnum} = require('../../constants');
const {ErrorHandler, customErrors} = require('../../errors');

module.exports = (req, res, next) => {
    const {status} = req.user;

    if (status !== UserStatusEnum.CONFIRMED) {
        return next(new ErrorHandler(
            ResponseStatusCodesEnum.FORBIDDEN,
            customErrors.FORBIDDEN_USER_NOT_CONFIRMED.message,
            customErrors.FORBIDDEN_USER_NOT_CONFIRMED.code));
    }

    next();
};
