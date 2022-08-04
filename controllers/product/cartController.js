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

        console.log('product price: ', parseInt(products[0].price), 'qty: ', qty, 'cart price: ', req.session.cart.totalPrice);
        if (variants.length <= 0) {
            delete req.session.cart.items[_id]

            req.session.cart.totalPrice = req.session.cart.totalPrice - totalProductPrice
            req.session.cart.totalQty = req.session.cart.totalQty - qty

            return res.status(200).json({ message: "Removed from cart!" })
        }

        req.session.cart = {
            items: {
                ...req.session.cart.items,
                [_id]: variants
            },
            totalPrice: req.session.cart.totalPrice - totalProductPrice,
            totalQty: req.session.cart.totalQty - qty
        }
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
}

module.exports = new CartController()