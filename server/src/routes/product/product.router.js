const {Router} = require('express');

const {productController} = require('../../controllers');
const {checkAccessTokenMiddleware} = require('../../middlewares');

const router = Router();

router.post('/', checkAccessTokenMiddleware, productController.createProduct);

module.exports = router;
