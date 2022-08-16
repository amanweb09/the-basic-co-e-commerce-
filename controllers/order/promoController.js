const { findPromo } = require('../../services/promoService')

class PromoController {

    async applyPromo(req, res) {

        const { code } = req.body
        if (!code) {
            return res.status(422).json({ err: "Code Can't be Empty!" })
        }

        if (req.session.cart) {
            const cart = req.session.cart
            if (!cart.promo) {
                cart.promo = { isApplied: false, code: '' }
            }

            if (cart.promo.isApplied === true) {
                return res.status(422).json({ err: "Code Already Applied!" })
            }

            const promo = await findPromo({ code, status: 'active' })
            if (!promo.length) {
                return res.status(404).json({ err: "Please enter a valid promo code!" })
            }

            if (promo[0].minimumAmount.amount > cart.totalPrice) {
                return res.status(422).json({ err: `Please add Rs.${promo[0].minimumAmount.amount - cart.totalPrice} to the cart to apply this code` })
            }

            let discount
            if (promo[0].type === 'percentage') {
                discount = Math.round(cart.totalPrice * promo[0].value/100)
            }
            else if (promo[0].type === 'amount') {
                discount = promo[0].value
            }

            req.session.cart.promo = { isApplied: true, code }
            req.session.cart.discount = discount

            console.log(req.session.cart);
            return res.status(200).json({ message: "Promo Code Applied Successfully" })
        }
        else {
            return res.status(422).json({ err: "Cart Not Found!" })
        }
    }
}

module.exports = new PromoController()