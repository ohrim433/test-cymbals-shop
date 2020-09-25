const {Router} = require('express');

const {userController} = require('../../controllers');
const {checkIsEmailExists} = require('../../middlewares');

const router = Router();

router.post('/', checkIsEmailExists, userController.createUser);

module.exports = router;
