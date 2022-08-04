const router = require('express').Router()

const loginController = require('../controllers/auth/loginController')
const signupController = require('../controllers/auth/signupController')
const orderController = require('../controllers/order/orderController')
const cartController = require('../controllers/product/cartController')
const productController = require('../controllers/product/productController')
const paymentController = require('../controllers/order/paymentController')

const authenticate = require('../middleware/authenticate')

router.get('/', (req, res) => {
    return res
    .status(200)
    .render('index')
})

router.get('/signup', signupController.render)
router.post('/signup', signupController.createUser)

router.get('/login', loginController.render)
router.post('/login', loginController.loginUser)

router.get('/products', productController.renderProductsPage)
router.get('/product/:_id', productController.showIndividualProduct)

router.post('/cart', cartController.addToCart)
router.get('/cart', cartController.renderCart)
router.post('/cart/shipping', cartController.changeShipping)
router.post('/cart/remove', cartController.removeProduct)

router.get('/checkout', orderController.renderCheckout)
router.post('/checkout', authenticate, orderController.initPayment)

router.get('/payment/:orderId', authenticate, paymentController.renderPaymentsPage)

module.exports = router