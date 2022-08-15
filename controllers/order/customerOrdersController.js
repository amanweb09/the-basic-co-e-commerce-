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

    async renderStatusPage(req, res) {
        const { _id } = req.params

        if (!_id) {
            req.flash('err', 'Please Select a Valid Order')
            return res.status(422).redirect('/customer/orders')
        }

        const order = await findOrders({ _id })

        if (!order.length) {
            req.flash('err', 'Something Went Wrong!')
            return res.status(404).redirect('/customer/orders')
        }

        return res.status(200).render('status', {
            status: order[0].status,
            orderId: order[0].orderId,
            createdAt: order[0].createdAt,
            updatedAt: order[0].updatedAt,
            moment
        })
    }
}

module.exports = new CustomerOrderController()