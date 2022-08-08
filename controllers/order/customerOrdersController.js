const { findOrders } = require('../../services/orderService')
const moment = require('moment')

class CustomerOrderController {

    async renderOrders(req, res) {
        const orders = await findOrders({ customer: req.user._id, status: { $ne: 'cancelled' } })

        if (orders) {
            return res.status(200).render('orders', {
                orders,
                moment,
                success: req.flash('success'),
                err: req.flash('err')
            })
        }
        else {
            req.flash('err', "Orders Couldn't be Retrived")
            return res.status(200).render('orders', {
                success: req.flash('success'),
                err: req.flash('err')
            })
        }
    }
}

module.exports = new CustomerOrderController()