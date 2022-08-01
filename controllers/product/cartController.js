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
                        [_id]: [{ color, size, qty: 1 }]
                    },
                    totalPrice: req.session.cart.totalPrice += parseInt(product.price),
                    totalQty: req.session.cart.totalQty += 1
                }
                return res.status(200).json({ message: 'ADDED TO CART', cart: req.session.cart })
            }

            const pid = req.session.cart.items[_id]
            if (pid[0].color !== color || pid[0].size !== size) {

                req.session.cart.items[_id].unshift({ color, size, qty: 1 })
                return res.status(200).json({ message: 'ADDED TO CART', cart: req.session.cart })
            }

            req.session.cart.items[_id][0].qty += 1
            req.session.cart.totalPrice = req.session.cart.totalPrice + parseInt(product.price)
            req.session.cart.totalQty += 1
            console.log(req.session.cart);

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
    
            // console.log(products);
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
            .render('cart', { cart: cartProducts })
    }

}

module.exports = new CartController()