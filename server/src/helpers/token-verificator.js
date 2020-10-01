// const {verify, VerifyErrors} = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');

const {ActionsEnum, ResponseStatusCodesEnum} = require('../constants');
const {ErrorHandler} = require('../errors');
const {config} = require('../config');

// const verifyPromise = promisify(verify);
const verify = promisify(jwt.verify);
module.exports = async (action, token) => {
    try {
        let isTokenValid;

        switch (action) {
            case ActionsEnum.USER_REGISTER:
                isTokenValid = await verify(token, config.JWT_CONFIRM_EMAIL_SECRET);
                break;

            case ActionsEnum.FORGOT_PASSWORD:
                isTokenValid = await verify(token, config.JWT_PASS_RESET_SECRET);
                break;

            default:
                throw new ErrorHandler(ResponseStatusCodesEnum.SERVER, 'Wrong action type');
        }

        return isTokenValid;
    } catch (e) {
        throw new ErrorHandler(ResponseStatusCodesEnum.UNAUTHORIZED, 'todo - change this message');
    }
};
