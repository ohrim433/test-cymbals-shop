const {customErrors, ErrorHandler} = require('../../errors');
const {ActionsEnum, RequestHeadersEnum, ResponseStatusCodesEnum} = require('../../constants');
const {userService} = require('../../services');

module.exports = async (req, res, next) => {
    const token = req.get(RequestHeadersEnum.AUTHORIZATION);

    if (!token) {
        return next(
            new ErrorHandler(
                ResponseStatusCodesEnum.BAD_REQUEST,
                customErrors.BAD_REQUEST_NO_TOKEN.message
            )
        );
    }

    const userByToken = await userService.findUserByActionToken(ActionsEnum.USER_REGISTER, token);

    if (!userByToken) {
        return next(
            new ErrorHandler(
                ResponseStatusCodesEnum.NOT_FOUND,
                customErrors.NOT_FOUND.message
            )
        );
    }

    req.user = userByToken;

    next();
};
