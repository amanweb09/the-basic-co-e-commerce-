const { Router } = require('express')
const router = Router()

const authenticate = require('../middleware/authenticate')
const admin = require('../middleware/admin')

const ad_productController = require('../controllers/admin/ad_productController')
const ad_dashboardController = require('../controllers/admin/ad_dashboardController')
const ad_orderController = require('../controllers/admin/ad_orderController')
const ad_promoController = require('../controllers/admin/ad_promoController')

router.get('/dashboard', authenticate, ad_dashboardController.buildDashboard)

router.get('/products/create', /* authenticate, admin, */ ad_productController.renderProductPanel)
router.post('/products/create', ad_productController.createProduct)

router.get('/orders/all', authenticate, ad_orderController.renderOrdersPage)
router.post('/status', authenticate, ad_orderController.changeOrderStatus)

router.get('/promo', authenticate, ad_promoController.renderPromo)
router.post('/promo', authenticate, ad_promoController.createPromo)

module.exports = router