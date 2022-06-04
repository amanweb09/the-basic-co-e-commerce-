const router = require('express').Router()

const loginController = require('../controllers/auth/loginController')
const signupController = require('../controllers/auth/signupController')
const productController = require('../controllers/product/productController')

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



module.exports = router