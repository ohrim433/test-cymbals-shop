const {Router} = require('express');

const {productController} = require('../../controllers');
const {checkIsUserExistsByEmailMiddleware} = require('../../middlewares');

const router = Router();

router.post('/', checkIsUserExistsByEmailMiddleware, productController.createProduct);

module.exports = router;
