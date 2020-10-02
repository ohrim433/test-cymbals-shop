const {ProductModel} = require('../../database');

class ProductService {
    createProduct(product) {
        const productToSave = new ProductModel(product);

        return productToSave.save();
    }
}

module.exports = new ProductService();
