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
                    items: {}, totalPrice: 0, totalQty: 0, shipping: { type: 'standard', cost: 30 }
                }
            }
            if (!req.session.cart.items[_id]) {

                req.session.cart = {
                    items: {
                        ...req.session.cart.items,
                        [_id]: [{ color, size, qty: 1 }]
                    },
                    totalPrice: req.session.cart.totalPrice += parseInt(product.price),
                    totalQty: req.session.cart.totalQty += 1,
                    shipping: { type: 'standard', cost: 30 }
                }
                return res.status(200).json({ message: 'ADDED TO CART', cart: req.session.cart })
            }

            const pid = req.session.cart.items[_id]
            if (pid[0].color !== color || pid[0].size !== size) {

                req.session.cart.items[_id].unshift({ color, size, qty: 1 })
                req.session.cart.totalQty += 1
                req.session.cart.totalPrice += parseInt(product.price)

                return res.status(200).json({ message: 'ADDED TO CART', cart: req.session.cart })
            }

            req.session.cart.items[_id][0].qty += 1
            req.session.cart.totalPrice = req.session.cart.totalPrice + parseInt(product.price)
            req.session.cart.totalQty += 1

            return res.status(200).json({ message: 'ADDED TO CART' })

        }
    }

    async renderCart(req, res) {

        // {
        //     items: {_id: [{ color, size, qty: 1 }, { color, size, qty: 1 } ]},
        //     totalPrice: 599,
        //     totalQty: 2
        // }

        let cartProducts = []
        if (req.session.cart) {
            const products = await getProducts({ $in: { _id: Object.keys(req.session.cart.items) } })

            function transformProduct(_id) {
                const product = products.filter((product) => {
                    return product._id.toString() === _id
                })
                const modProduct = {
                    product: new ProductDTO(product[0]),
                    variants: req.session.cart.items[_id]
                }
                cartProducts.push(modProduct)
            }

            const productsInCart = Object.keys(req.session.cart.items)
            productsInCart.forEach((id) => {
                transformProduct(id)
            })
        }

        return res
            .status(200)
            .render('cart', {
                cart: cartProducts,
                totalPrice: req.session.cart ? req.session.cart.totalPrice : 0,
                totalQty: req.session.cart ? req.session.cart.totalQty : 0
            })
    }

    async removeProduct(req, res) {
        const { _id, color, size, qty } = req.body
        if (!_id || !color || !size || !qty) {
            return res.status(422).json({ err: "Incomplete Product Information" })
        }

        const product = req.session.cart.items[_id]
        if (!product) {
            return res.status(422).json({ err: "Invalid Product Information" })
        }

        const variants = product.filter((prod) => {
            return prod.color !== color && prod.size !== size
        })

        const products = await getProducts({ _id })
        const totalProductPrice = qty * parseInt(products[0].price)

        if (variants.length <= 0) {
            req.session.cart.totalPrice = req.session.cart.totalPrice - totalProductPrice
            req.session.cart.totalQty = req.session.cart.totalQty - qty
            delete req.session.cart.items[_id]

            return res.status(200).json({ message: "Removed from cart!" })
        }

        req.session.cart.items[_id] = variants
        req.session.cart.totalPrice = req.session.cart.totalPrice - totalProductPrice
        req.session.cart.totalQty = req.session.cart.totalQty - qty
        req.session.cart.discount = 0
        req.session.cart.promo = { isApplied: false, code: '' }

        return res.status(200).json({ message: "Removed from cart" })

    }

    changeShipping(req, res) {
        const { type } = req.body
        if (!type) {
            return res.status(422).json({ err: 'Please specify the shipping type' })
        }

        if (type === 'express') {
            req.session.cart.shipping.type = type
            req.session.cart.shipping.cost = 100

            return res.status(200).json({ cart: req.session.cart })
        }
        else if (type === 'standard') {
            req.session.cart.shipping.type = type
            req.session.cart.shipping.cost = 30

            return res.status(200).json({ cart: req.session.cart })
        }
    }

    changeQty(req, res) {
        const { type } = req.params
        const { _id, color, size } = req.body

        if (!type || !_id) {
            return res.status(422).json({ err: 'Please enter a valid type/product id' })
        }

        const product = req.session.cart.items[_id]

        const cart = req.session.cart
        if (!req.session.cart.items[_id]) {
            return res.status(422).json({ err: 'Product not found in the cart' })
        }

        const item = req.session.cart.items[_id]
        const variant = item.filter((item) => { return item.color === color && item.size === size })
        // console.log(variant);

        if (type === 'increment') {
            variant.qty += 1
        }
        if (type === 'decrement') {
            if (variant.qty <= 1) {
                delete req.session.cart.items[_id]
            }
            else {
                variant.qty -= 1
            }
        }
        return res.status(200).json({ err: 'Quantity updated' })
    }

    clearCart(req, res) {
        delete req.session.cart
        return res.status(200).redirect('/cart')
    }
}

module.exports = new CartController()