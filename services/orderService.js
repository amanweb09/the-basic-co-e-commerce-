const Orders = require('../models/order')

class OrderService {

    async createOrder(order) {
        try {
            return await Orders.create(order)
        } catch (error) {
            return error
        }
    }

    async findOrders(filter) {
        try {
            return await Orders
                .find(filter)
                .sort({ createdAt: '-1' })
                .populate('products._id')
                .populate('customer')
                .exec()

        } catch (error) {
            return error
        }

    }
}

module.exports = new OrderService()