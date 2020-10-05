const jwt = require('jsonwebtoken');

const {ActionsEnum, ResponseStatusCodesEnum} = require('../constants');
const {ErrorHandler} = require('../errors');
const {config} = require('../config');

module.exports = (action) => {
    let accessToken = '';
    let refreshToken = '';

    switch (action) {
        case ActionsEnum.USER_AUTH:
            accessToken = jwt.sign(
                {},
                config.JWT_SECRET,
                {expiresIn: config.ACCESS_TOKEN_LIFETIME});
            refreshToken = jwt.sign(
                {},
                config.JWT_REFRESH_SECRET,
                {expiresIn: config.REFRESH_TOKEN_LIFETIME});
            break;

        case ActionsEnum.USER_REGISTER:
            accessToken = jwt.sign(
                {},
                config.JWT_CONFIRM_EMAIL_SECRET,
                {expiresIn: config.JWT_CONFIRM_EMAIL_LIFETIME});
            break;

        case ActionsEnum.FORGOT_PASSWORD:
            accessToken = jwt.sign(
                {},
                config.JWT_PASS_RESET_SECRET,
                {expiresIn: config.JWT_PASS_RESET_LIFETIME});
            break;

        default:
            throw new ErrorHandler(ResponseStatusCodesEnum.SERVER, 'Wrong action type');
    }

    return {
        accessToken,
        refreshToken
    };
};
