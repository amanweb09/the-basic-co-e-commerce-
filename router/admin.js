const { Router } = require('express')
const router = Router()

const authenticate = require('../middleware/authenticate')
const admin = require('../middleware/admin')

const ad_productController = require('../controllers/admin/ad_productController')
const ad_dashboardController = require('../controllers/admin/ad_dashboardController')
const ad_orderController = require('../controllers/admin/ad_orderController')
const ad_promoController = require('../controllers/admin/ad_promoController')
const ad_cancellationController = require('../controllers/admin/ad_cancellationController')
const ad_categoryController = require('../controllers/admin/ad_categoryController')

router.get('/dashboard', authenticate, admin, ad_dashboardController.buildDashboard)

router.get('/products/create', authenticate, admin, ad_productController.renderProductPanel)
router.post('/products/create', authenticate, admin, ad_productController.createProduct)
router.get('/products/all', authenticate, admin, ad_productController.renderAllProducts)
router.post('/products/delete', authenticate, admin, ad_productController.deleteProduct)

router.get('/orders/all', authenticate, admin, ad_orderController.renderOrdersPage)
router.post('/status', authenticate, admin, ad_orderController.changeOrderStatus)

router.get('/promo', authenticate, admin, ad_promoController.renderPromo)
router.post('/promo/create', authenticate, admin, ad_promoController.createPromo)
router.post('/promo/update', authenticate, admin, ad_promoController.changePromoStatus)
router.post('/promo/delete', authenticate, admin, ad_promoController.deletePromo)

router.get('/cancellations', authenticate, admin, ad_cancellationController.renderCancellationView)
router.post('/cancellations', authenticate, admin, ad_cancellationController.changeRequeststatus)

router.get('/categories/all', authenticate, admin, ad_categoryController.renderCategoriesView)
router.post('/categories/create', authenticate, admin, ad_categoryController.createNewCategory)
router.post('/sub-categories/create', authenticate, admin, ad_categoryController.createNewSubCategory)

module.exports = router