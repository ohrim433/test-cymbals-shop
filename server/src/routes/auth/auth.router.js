const {Router} = require('express');

const {authController} = require('../../controllers');
const {
    checkAccessTokenMiddleware,
    checkIsUserConfirmedMiddleware,
    checkIsUserExistsByEmailMiddleware,
    emailPasswordValidationMiddleware
} = require('../../middlewares');

const router = Router();

router.post(
    '/',
    emailPasswordValidationMiddleware,
    checkIsUserExistsByEmailMiddleware,
    checkIsUserConfirmedMiddleware,
    authController.authUser
);
router.post('/logout', checkAccessTokenMiddleware, authController.logoutUser);

module.exports = router;
