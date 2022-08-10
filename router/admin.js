const { Router } = require('express')
const router = Router()

const ad_productController = require('../controllers/admin/ad_productController')
const authenticate = require('../middleware/authenticate')
const admin = require('../middleware/admin')
const ad_dashboardController = require('../controllers/admin/ad_dashboardController')

router.get('/dashboard', authenticate, ad_dashboardController.buildDashboard)
router.get('/products/create', /* authenticate, admin, */ ad_productController.renderProductPanel)
router.post('/products/create', ad_productController.createProduct)


module.exports = router