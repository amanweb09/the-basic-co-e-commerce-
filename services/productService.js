const Products = require('../models/product')

class ProductService {

    async createProduct(product) {
        try {
            return await Products.create(product) 
        } catch (error) {
            return error
        }
    }

    async getProducts(filter) {
        try {
            return await Products.find(filter) 
        } catch (error) {
            return error
        }
    }
}

module.exports = new ProductService()