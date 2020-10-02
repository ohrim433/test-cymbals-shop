module.exports.checkConfirmTokenMiddleware = require('./token/check-confirm-token.middleware');
module.exports.checkForgotPasswordTokenMiddleware = require('./token/check-forgot-pass-token.middleware');
module.exports.checkIsEmailExistsMiddleware = require('./user/check-is-email-exists.middleware');
module.exports.checkIsUserExistsByEmailMiddleware = require('./user/check-is-user-exists-by-email.middleware');
module.exports.checkIsUserExistsByTokenMiddleware = require('./user/check-is-user-exists-by-token.middleware');
module.exports.checkIsUserValidMiddleware = require('./user/check-is-user-valid.middleware');
module.exports.emailValidationMiddleware = require('./validators/email-validation.middleware');
module.exports.singlePasswordValidationMiddleware = require('./validators/single-password-validator.moddleware');
