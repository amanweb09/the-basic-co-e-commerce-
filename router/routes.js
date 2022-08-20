const router = require('express').Router()

const loginController = require('../controllers/auth/loginController')
const signupController = require('../controllers/auth/signupController')
const orderController = require('../controllers/order/orderController')
const cartController = require('../controllers/product/cartController')
const productController = require('../controllers/product/productController')
const paymentController = require('../controllers/order/paymentController')
const customerOrderController = require('../controllers/order/customerOrdersController')
const passwordController = require('../controllers/auth/passwordController')

const authenticate = require('../middleware/authenticate')
const promoController = require('../controllers/order/promoController')
const cancellationController = require('../controllers/order/cancellationController')

router.get('/', (req, res) => {
    return res
        .status(200)
        .render('index', {
            errMessage: req.flash('errMessage'),
            successMessage: req.flash('successMessage')
        })
})
router.get('/about', (req, res) => { return res.status(200).render('about') })
router.get('/profile', authenticate, (req, res) => { return res.status(200).render('profile', { user: req.user }) })

router.get('/signup', signupController.render)
router.post('/signup', signupController.createUser)

router.get('/login', loginController.render)
router.post('/login', loginController.loginUser)
router.get('/logout', authenticate, loginController.logout)

router.get('/forget-password', passwordController.renderForgetPage)
router.post('/forget-password', passwordController.buildResetLink)
router.get('/reset-password/:link', passwordController.verifyResetLink)
router.post('/reset-password/:link', passwordController.updatePassword)

router.get('/products', productController.renderProductsPage)
router.get('/product/:_id', productController.showIndividualProduct)

router.post('/cart', cartController.addToCart)
router.get('/cart', cartController.renderCart)
router.post('/cart/shipping', cartController.changeShipping)
router.post('/cart/remove', cartController.removeProduct)
router.get('/cart/clear', cartController.clearCart)
router.post('/cart/qty/:type', cartController.changeQty)

router.post('/promo/apply', promoController.applyPromo)
router.post('/promo/delete', promoController.removePromo)

router.get('/customer/orders', authenticate, customerOrderController.renderOrders)
router.post('/order', authenticate, orderController.saveNewOrder)
router.get('/order/status/:_id', customerOrderController.renderStatusPage)

router.get('/checkout', orderController.renderCheckout)
router.post('/checkout', authenticate, orderController.initPayment)

router.get('/payment/:orderId', authenticate, paymentController.renderPaymentsPage)

router.get('/order/cancel', authenticate, cancellationController.renderCancellationView)
router.post('/order/cancel', authenticate, cancellationController.submitRequest)



module.exports = router