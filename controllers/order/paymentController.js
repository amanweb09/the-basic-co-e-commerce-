const { fetchOrder } = require('../../util/payment')

class PaymentController {

    async renderPaymentsPage(req, res) {
        const { orderId } = req.params

        if (!orderId) {
            return res.status(422).redirect('/checkout')
        }

        const order = await fetchOrder(orderId)
        if (order.id) {
            return res.status(200).render('payment', {
                orderId: order.id,
                amount: order.amount,
                receipt: order.receipt,
                user: req.user
            })
        }
        else if (order.error){
            req.flash('err', 'Payment Validation Failed')
            return res.status(401).redirect('/checkout')
        }
        return res.status(401).redirect('/checkout')
    }
}

module.exports = new PaymentController()