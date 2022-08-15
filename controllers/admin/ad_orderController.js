const { findOrders } = require('../../services/orderService')
const moment = require('moment')
const Orders = require('../../models/order')

class AdminProductController {

    async renderOrdersPage(req, res) {
        const orders = await findOrders()

        return res.status(200).render('admin/orders', { orders, moment })
    }

    async changeOrderStatus(req, res) {
        const { status, _id } = req.body
        if (!status || !_id) {
            return res.status(422).json({ err: 'please enter a valid status and id' })
        }
        try {
            await Orders.updateOne({ _id }, { status })
            const [order] = await findOrders({ _id })

            const emitter = req.app.get('emitter')
            emitter.emit('status_updated', { status, orderId: order.orderId })

            return res.status(200).json({ status })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ err: 'Server Unavailable! Please Retry' })
        }
    }
}

module.exports = new AdminProductController()