const { createOrder } = require('../../util/payment')
class OrderController {
    renderCheckout(req, res) {
        return res.status(200).render('checkout', {
            success: req.flash('success'),
            err: req.flash('err')
        })
    }

    async initPayment(req, res) {

        console.log(req.body);
        if (req.body.addressString) {
            const address = JSON.parse(req.body.addressString)
            const { addressLine1, addressLine2, landmark, state, pin, country } = address
            if (!req.body.name || !req.body.tel || !addressLine1 || !addressLine2 || !landmark || !state || !pin || !country) {
                req.flash('err', 'Please fill all the fields!')
                return res.status(422).redirect('/checkout')
            }
        }
        else {
            const { name, tel, addressLine1, addressLine2, landmark, state, pin, country } = req.body
            if (!name || !tel || !addressLine1 || !addressLine2 || !landmark || !state || !pin || !country) {
                req.flash('err', 'Please fill all the fields!')
                return res.status(422).redirect('/checkout')
            }
        }

        const totalPrice = req.session.cart.totalPrice + req.session.cart.shipping.cost
        const order = await createOrder({
            amount: totalPrice * 100,
            userId: req.user._id
        })

        return res.status(201).redirect(`/payment/${order.id}`)
    }
}

module.exports = new OrderController()