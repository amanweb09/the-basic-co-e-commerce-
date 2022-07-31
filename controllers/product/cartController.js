const { getProducts } = require('../../services/productService')
const ProductDTO = require('../../dtos/productDTO')
class CartController {

    async addToCart(req, res) {

        const { cart: cartString } = req.body

        if (cartString) {
            const cart = JSON.parse(cartString)
            const items = Object.keys(cart.items)

            const products = await getProducts({ $in: { _id: items } })
            const modProducts = []
            let totalPrice = 0

            // {items: {_id: {qty, color, price},{_id: {qty, color, price},}}

            products.forEach((product) => {
                const modProduct = new ProductDTO(product)
                modProducts.push(modProduct)

                const qty = cart.items[product._id].qty
                const price = product.price

                totalPrice = qty*price
            })

            return res
                .status(200)
                .json({ products: modProducts, totalPrice })
        }

        return res
            .status(200)
            .json({ products: [] })
    }

    renderCart(req, res) {
        return res
            .status(200)
            .render('cart')
    }

}

module.exports = new CartController()