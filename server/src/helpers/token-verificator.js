const {verify} = require('jsonwebtoken');
const {promisify} = require('util');

const {ActionsEnum, ResponseStatusCodesEnum} = require('../constants');
const {customErrors, ErrorHandler} = require('../errors');
const {config} = require('../config');

const verifyPromise = promisify(verify);
module.exports = async (action, token) => {
    try {
        let isTokenValid;

        switch (action) {
            case ActionsEnum.USER_AUTH:
                isTokenValid = await verifyPromise(token, config.JWT_SECRET);
                break;

            case ActionsEnum.USER_REGISTER:
                isTokenValid = await verifyPromise(token, config.JWT_CONFIRM_EMAIL_SECRET);
                break;

            case ActionsEnum.FORGOT_PASSWORD:
                isTokenValid = await verifyPromise(token, config.JWT_PASS_RESET_SECRET);
                break;

            default:
                throw new ErrorHandler(ResponseStatusCodesEnum.SERVER, 'Wrong action type');
        }

        return isTokenValid;
    } catch (e) {
        throw new ErrorHandler(
            ResponseStatusCodesEnum.UNAUTHORIZED,
            customErrors.UNAUTHORIZED_BAD_TOKEN.message
        );
    }
};
