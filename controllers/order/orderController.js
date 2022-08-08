const { createOrder } = require('../../util/payment')
const generateUniqueId = require('generate-unique-id')
const { getProducts } = require('../../services/productService')
const { createOrder: createNewOrder } = require('../../services/orderService')
const orderValidator = require('../../validators/orderValidator')
class OrderController {
    renderCheckout(req, res) {
        return res.status(200).render('checkout', {
            success: req.flash('success'),
            err: req.flash('err')
        })
    }

    async initPayment(req, res) {

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

    async saveNewOrder(req, res) {
        const { address: addressString, paymentMethod } = req.body
        if (!addressString || !paymentMethod) {
            req.flash('err', 'Please fill in a valid address or payment method')
            return res.status(422).redirect('/checkout')
        }

        const address = JSON.parse(addressString)

        const { addressLine1, addressLine2, landmark, state, pin, country } = address
        if (!addressLine1 || !addressLine2 || !landmark || !state || !pin || !country) {
            console.log('2');
            req.flash('err', 'Please fill in a valid address or payment method')
            return res.status(422).redirect('/checkout')
        }

        const uuid = generateUniqueId({ length: 15 })
        const orderId = `TBC-${uuid}`

        const cart = req.session.cart

        if (!cart) {
            req.flash('err', 'No Products Found in the Cart')
            return res.status(422).redirect('/cart')
        }

        const cartItems = Object.keys(cart.items)
        const products = await getProducts({ $in: { _id: cartItems } })
        // [{_id, title, price, desc ...}, {_id, title, price, desc ...}]
        // {items: {_id: [{color, size, qty}, {color, size, qty}]}, totalQty, totalPrice}

        let items = []
        products.forEach((item) => {
            const cPr = cart.items[item._id]
            items.push({
                _id: item._id,
                variants: cPr
            })
        })

        const order = {
            orderId,
            customer: req.user._id.toString(),
            address,
            products: items,
            totalPrice: cart.totalPrice,
            shipping: cart.shipping.type,
            promoCode: cart.promoCode ? { isApplied: true, code: cart.promo } : { isApplied: false },
            payment: {
                status: paymentMethod === 'COD' ? false : paymentMethod === 'rp' ? true : false,
                method: paymentMethod
            }
        }

        try {
            const validate = await orderValidator(order)
        } catch (error) {
            console.log(error.details[0].message);
            req.flash('err', 'Please Fill in Valid Details')
            return res.status(422).redirect('/checkout')
        }

        const saveOrder = await createNewOrder(order)

        if (saveOrder) {
            delete req.session.cart
            req.flash('success', 'Your Order has Been Placed!')
            return res.status(201).redirect('/customer/orders')
        }

        req.flash('error', 'Something went wrong!')
        return res.status(500).redirect('/checkout')
    }
}

module.exports = new OrderController()