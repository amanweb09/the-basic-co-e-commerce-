const { createOrder } = require('../../util/payment')
class OrderController {
    renderCheckout(req, res) {
        return res.status(200).render('checkout', {
            success: req.flash('success'),
            err: req.flash('err')
        })
    }

    async initPayment(req, res) {
        const { name, tel, addressLine1, addressLine2, landmark, state, pin, country } = req.body

        if (!name || !tel || !addressLine1 || !addressLine2 || !landmark || !state || !pin || !country) {
            req.flash('err', 'Please fill all the fields!')
            return res.status(422).redirect('/checkout')
        }

        const order = await createOrder({
            amount: req.session.cart.totalPrice * 100,
            userId: req.user._id
        })

        return res.status(201).redirect(`/payment/${order.id}`)
    }
}

module.exports = new OrderController()