const { getProducts } = require('../../services/productService')

class CartController {

    async addToCart(req, res) {

        const { itemId, color, size } = req.body
        let cart = req.session.cart

        if (cart === null || cart === undefined || cart === false || !cart) {
            cart = {
                items: {},
                totalItems: 0,
                totalPrice: 0
            }
        }

        const item = await getProducts({ _id: itemId })

        if (!item.length) {
            return res
                .status(422)
                .json({ message: 'invalid product!' })
        }

        if (!cart.items[itemId]) {
            console.log('not there', req.session.cart);
            // cart = {
            //     ...cart,
            //     items: {
            //         ...cart.items,
            //         [itemId]: { color, size, qty: 1 }
            //     },
            //     totalItems: cart.totalItems + 1,
            //     totalPrice: cart.totalPrice + parseInt(item[0].price)
            // }
            // cart.items[itemId] = { color, size, qty: 1 }
            // cart.totalItems += 1
            // cart.totalPrice += parseInt(item[0].price)

            // return res
            //     .status(200)
            //     .json({ message: "Added to cart", cart })
        }

        else {
            // cart = {
            //     ...cart,
            //     items: {
            //         ...cart.items,
            //         [itemId]: { color, size, qty: cart.items[itemId].qty + 1 }
            //     },
            //     totalItems: cart.totalItems + 1,
            //     totalPrice: cart.totalPrice + parseInt(item[0].price)
            // }
            // cart.items[itemId].qty += 1
            // cart.totalItems += 1
            // cart.totalPrice += parseInt(item[0].price)

            console.log('already there', req.session.cart);
            // return res
            //     .status(200)
            //     .json({ message: "Qty increased", cart })
        }
    }

    renderCart(req, res) {
        return res
            .status(200)
            .render('cart', {
                cart: req.session.cart ? req.session.cart : {}
            })
    }

}

module.exports = new CartController()