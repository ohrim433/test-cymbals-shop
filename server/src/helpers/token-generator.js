const jwt = require('jsonwebtoken');

const {ActionsEnum, ResponseStatusCodesEnum} = require('../constants');
const {ErrorHandler} = require('../errors');
const {config} = require('../config');

module.exports = (action) => {
    let accessToken = '';
    const refreshToken = '';

    switch (action) {
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
