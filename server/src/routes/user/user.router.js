const {Router} = require('express');

const {userController} = require('../../controllers');

const router = Router();

router.post('/', userController.createUser);

module.exports = router;
