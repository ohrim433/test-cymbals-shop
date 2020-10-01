module.exports.checkConfirmTokenMiddleware = require('./token/check-confirm-token.middleware');
module.exports.checkForgotPasswordTokenMiddleware = require('./token/check-forgot-pass-token.middleware');
module.exports.checkIsEmailExistsMiddleware = require('./user/check-is-email-exists.middleware');
module.exports.checkIsUserExistsMiddleware = require('./user/check-is-user-exists.middleware');
module.exports.checkIsUserValidMiddleware = require('./user/check-is-user-valid.middleware');
module.exports.emailValidationMiddleware = require('./validators/email-validation.middleware');
module.exports.singlePasswordValidationMiddleware = require('./validators/single-password-validator.moddleware');
