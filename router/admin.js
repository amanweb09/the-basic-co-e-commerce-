const { Router } = require('express')
const router = Router()

const ad_productController = require('../controllers/admin/ad_productController')
const authenticate = require('../middleware/authenticate')
const admin = require('../middleware/admin')

router.get('/dashboard', (req, res) => {
   return res.status(200).render('admin/dashboard')
})
router.get('/products/create', /* authenticate, admin, */ ad_productController.renderProductPanel)
router.post('/products/create', ad_productController.createProduct)


module.exports = router