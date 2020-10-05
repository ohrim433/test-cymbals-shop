const {customErrors, ErrorHandler} = require('../../errors');
const {ActionsEnum, RequestHeadersEnum, ResponseStatusCodesEnum} = require('../../constants');
const {authService} = require('../../services');
const {tokenVerificator} = require('../../helpers');

module.exports = async (req, res, next) => {
    try {
        const token = req.get(RequestHeadersEnum.AUTHORIZATION);

        if (!token) {
            return next(
                new ErrorHandler(
                    ResponseStatusCodesEnum.BAD_REQUEST,
                    customErrors.BAD_REQUEST_NO_TOKEN.message
                )
            );
        }

        await tokenVerificator(ActionsEnum.USER_AUTH, token);

        const userByToken = await authService.findUserByToken({accessToken: token});

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
    } catch (e) {
        next(e);
    }
};
