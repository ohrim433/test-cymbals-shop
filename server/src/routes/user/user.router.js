const {Router} = require('express');

const {userController} = require('../../controllers');
const {checkConfirmTokenMiddleware, checkIsEmailExistsMiddleware} = require('../../middlewares');

const router = Router();

router.post('/', checkIsEmailExistsMiddleware, userController.createUser);
router.post('/confirm', checkConfirmTokenMiddleware, userController.confirmUser);

module.exports = router;
