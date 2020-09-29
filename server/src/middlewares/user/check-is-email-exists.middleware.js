const {ResponseStatusCodesEnum} = require('../../constants');
const {userService} = require('../../services');
const {ErrorHandler, customErrors} = require('../../errors');

module.exports = async (req, res, next) => {
    const {email} = req.body;
    const userByEmail = await userService.findOneByParams({email});

    if (userByEmail) {
        return next(new ErrorHandler(
            ResponseStatusCodesEnum.BAD_REQUEST,
            customErrors.BAD_REQUEST_USER_REGISTERED.message,
            customErrors.BAD_REQUEST_USER_REGISTERED.code));
    }

    next();
};
