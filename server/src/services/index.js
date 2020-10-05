const authService = require('./auth/auth.service');
const emailService = require('./email/email.service');
const logService = require('./log/log.service');
const userService = require('./user/user.service');
const productService = require('./product/product.service');

module.exports = {
    authService,
    emailService,
    logService,
    productService,
    userService
};
