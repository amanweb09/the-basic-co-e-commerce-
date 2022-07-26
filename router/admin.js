const { Router } = require('express')
const router = Router()

const ad_productController = require('../controllers/admin/ad_productController')
const authenticate = require('../middleware/authenticate')
const admin = require('../middleware/admin')
const productService = require('../services/productService')


router.get('/products/create', /* authenticate, admin, */ ad_productController.renderProductPanel)
router.post('/products/create', ad_productController.createProduct)

router.get('/test', async (req, res) => {
   const prods = await productService.getProducts()
   console.log(prods);
})

module.exports = router