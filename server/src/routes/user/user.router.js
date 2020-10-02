const {Router} = require('express');

const {
    checkConfirmTokenMiddleware,
    checkForgotPasswordTokenMiddleware,
    checkIsEmailExistsMiddleware,
    checkIsUserExistsByEmailMiddleware,
    checkIsUserValidMiddleware,
    emailValidationMiddleware,
    singlePasswordValidationMiddleware
} = require('../../middlewares');
const {userController} = require('../../controllers');

const router = Router();

router.post('/', checkIsUserValidMiddleware, checkIsEmailExistsMiddleware, userController.createUser);
router.post(
    '/confirm',
    checkConfirmTokenMiddleware,
    userController.confirmUser
);
router.post(
    '/password/forgot',
    emailValidationMiddleware,
    checkIsUserExistsByEmailMiddleware,
    userController.forgotPassword
);
router.post(
    '/password/reset',
    singlePasswordValidationMiddleware,
    checkForgotPasswordTokenMiddleware,
    userController.setForgotPassword
);

module.exports = router;
