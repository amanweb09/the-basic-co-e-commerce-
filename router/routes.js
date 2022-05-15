const router = require('express').Router()

const signupController = require('../controllers/auth/signupController')

router.get('/', (req, res) => {
    return res
        .status(200)
        .render('index')
})

router.get('/signup', signupController.showSignupPage)

module.exports = router