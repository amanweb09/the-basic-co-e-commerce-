
class SignupController {
    showSignupPage(req, res) {
        return res
            .status(200)
            .render('signup')
    }
}

module.exports = new SignupController()