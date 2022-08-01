const { getProducts } = require('../../services/productService')
const ProductDTO = require('../../dtos/productDTO')
class CartController {

    async addToCart(req, res) {

        const { cart } = req.body

        if (cart) {
            const { _id, color, size } = cart

            if (!_id || !color || !size) {
                return res.status(422).json({ err: 'Please select a valid product/size/color' })
            }

            const [product] = await getProducts({ _id })

            let _cart = req.session.cart

            if (!_cart || _cart == undefined) {
                req.session.cart = {
                    items: {}, totalPrice: 0, totalQty: 0
                }
            }
            if (!req.session.cart.items[_id]) {
                req.session.cart = {
                    items: {
                        ...req.session.cart.items,
                        [_id]: { color, size, qty: 1 }
                    },
                    totalPrice: req.session.cart.totalPrice += parseInt(product.price),
                    totalQty: req.session.cart.totalQty += 1
                }
                console.log(req.session.cart)
                return res.status(200).json({ message: 'ADDED TO CART', cart: req.session.cart })
            }
            req.session.cart.items[_id].qty += 1
            req.session.cart.totalPrice = req.session.cart.totalPrice + parseInt(product.price)
            req.session.cart.totalQty += 1

            console.log(_cart)
            return res.status(200).json({ message: 'ADDED TO CART', cart: _cart })

        }
    }

    renderCart(req, res) {
        return res
            .status(200)
            .render('cart', { cart: req.session.cart })
    }

}

module.exports = new CartController()