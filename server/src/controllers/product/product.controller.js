const {productService} = require('../../services');

class ProductController {
    async createProduct(req, res, next) {
        const {_id} = req.user;
        const product = req.body;

        const createdProduct = await productService.createProduct({...product, userId: _id});

        res.json(createdProduct.toJSON);
    }
}

module.exports = new ProductController();
