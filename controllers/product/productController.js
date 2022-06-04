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

            const products = await getProducts({ [searchIn]: qa })
            return res
                .status(200)
                .json(products)
            // return res
            //     .status(200)
            //     .render('products', {
            //         products
            //     })
        }
        else if (req.query.type === 'multiple') {
            const { qa, searchIna, qb, searchInb } = req.query

            if (!qa || !searchIna || !qb || !searchInb) {
                // req.flash('err', 'No products found')
                // return res
                //     .redirect('/products')
                return res.json('invalid params')
            }

            const products = await getProducts({ [searchIna]: qa, [searchInb]: qb })
            return res
                .status(200)
                .json(products)
            // return res
            //     .status(200)
            //     .render('products', {
            //         products
            //     })
        }
        
        const products = await getProducts()
        return res
            .status(200)
            .json(products)
        // return res
        //     .status(200)
        //     .render('products', {
        //         products
        //     })
    }

}

module.exports = new ProductController()