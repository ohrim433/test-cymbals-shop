const {Router} = require('express');

const {authController} = require('../../controllers');
const {
    checkAccessTokenMiddleware,
    checkIsUserConfirmedMiddleware,
    checkIsUserExistsMiddleware,
    emailPasswordValidationMiddleware
} = require('../../middlewares');

const router = Router();

router.post(
    '/',
    emailPasswordValidationMiddleware,
    checkIsUserExistsMiddleware,
    checkIsUserConfirmedMiddleware,
    authController.authUser
);
router.post('/logout', checkAccessTokenMiddleware, authController.logoutUser);

module.exports = router;
