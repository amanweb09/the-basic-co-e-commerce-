const { Router } = require('express')
const router = Router()

const ad_productController = require('../controllers/admin/ad_productController')
const authenticate = require('../middleware/authenticate')
const admin = require('../middleware/admin')
// const upload = require('../services/upload')

const multer = require('multer')
// const { join } = require('path')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {

//         cb(null, join(__dirname, '../public/images'))
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })

const upload = multer({ dest: '/public/images' })

router.get('/products/create', /* authenticate, admin, */ upload.single('imgPrimary'), ad_productController.renderProductPanel)
router.post('/products/create', ad_productController.createProduct)

module.exports = router