const { Router } = require('express')
const ad_productController = require('../controllers/admin/ad_productController')
const router = Router()

router.post('/products/create', ad_productController.createProduct)

module.exports = router