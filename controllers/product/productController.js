const ProductDTO = require('../../dtos/productDTO')
const { getProducts } = require('../../services/productService')

class ProductController {

    async renderProductsPage(req, res) {
        if (req.query.type === 'single') {

            const { qa, searchIn } = req.query

            if (!qa || !searchIn) {
                req.flash('err', 'invalid query')
                return res
                    .redirect('/')
            }

            const products = await getProducts({ [searchIn.title]: qa })

            // return res
            //     .status(200)
            //     .json(products)
            return res
                .status(200)
                .render('products', {
                    products
                })
        }
        else if (req.query.type === 'multiple') {
            const { qa, searchIna, qb, searchInb } = req.query

            if (!qa || !searchIna || !qb || !searchInb) {
                req.flash('err', 'No products found')
                return res
                    .redirect('/products')
                // return res.json('invalid params')
            }

            const products = await getProducts({ [searchIna.title]: qa, [searchInb.title]: qb })

            // return res
            //     .status(200)
            //     .json(products)
            return res
                .status(200)
                .render('products', {
                    products
                })
        }

        else if (req.query.type === 'tags') {

            if (!req.query.tag) {
                req.flash('err', 'No products found')
                return res
                    .redirect('/products')
                // return res.json('invalid params')
            }

            const products = await getProducts({ tags: req.query.tag })
            // return res
            //     .status(200)
            //     .json(products)
            return res
                .status(200)
                .render('products', {
                    products
                })
        }

        const products = await getProducts()
        // return res
        //     .status(200)
        //     .json(products)
        return res
            .status(200)
            .render('products', {
                products
            })
    }

    async showIndividualProduct(req, res) {
        const { _id } = req.params

        if (!_id) {
            req.flash('err', 'Invalid product')
            return res
                .redirect('/product')
        }

        const product = await getProducts({ _id })

        if (product) {

            const modProduct = new ProductDTO(product[0])

            return res
                .status(200)
                .render('product', {
                    product: modProduct
                })
        }

        req.flash('err', 'Product not found!')
        return res
            .redirect('/product')
    }

}

module.exports = new ProductController()