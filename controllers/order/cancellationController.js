const orderService = require("../../services/orderService")
const Cancellations = require('../../models/cancellation')

class CancellationController {

    renderCancellationView(req, res) {
        return res.status(200).render('cancellation', {
            err: req.flash('err'),
            success: req.flash('success')
        })
    }

    async submitRequest(req, res) {
        const { orderId, reason } = req.body

        if (!orderId || !reason) {
            req.flash('err', 'All fields are required')
            return res.status(422).redirect('/order/cancel')
        }

        let [code, oid] = orderId.split('-')
        oid = oid.toLowerCase()
        oid = `TBC-${oid}`

        const orders = await orderService.findOrders({ orderId: oid })

        if (!orders.length) {
            req.flash('err', 'No order found with this ID')
            return res.status(422).redirect('/order/cancel')
        }

        const request = { orderId, reason }
        try {
            await Cancellations.create(request)
            req.flash('success', 'Request submmited successfully! Our executive will contact you in some time')
            return res.status(201).redirect('/order/cancel')
        } catch (error) {
            console.log(error);
            req.flash('err', 'Something went wrong')
            return res.status(500).redirect('/order/cancel')
        }
    }

}

module.exports = new CancellationController()