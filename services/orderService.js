const Orders = require('../models/order')

class OrderService {

    async createOrder(order) {
        try {
            return await Orders.create(order)
        } catch (error) {
            return error
        }
    }
    
    async findOrder(filter) {
        try {
            return await Orders.find(filter)
        } catch (error) {
            return error
        }

    }
}

module.exports = new OrderService()