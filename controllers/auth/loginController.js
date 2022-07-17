const { hash } = require("../../services/hashingService")
const { generateTokens } = require("../../services/tokenService")
const { findUsers } = require("../../services/userService")

class LoginController {

    render(req, res) {
        res
            .status(200)
            .render('login', {
                errMessage: req.flash('errMessage'),
                successMessage: req.flash('successMessage')
            })
    }

    async loginUser(req, res) {
        const { email_tel, password } = req.body

        if (!email_tel || !password) {
            req.flash('errMessage', 'All fields are required!')
            return res
                .redirect('/login')
        }

        const users = await findUsers({ $or: [{ email: email_tel }, { tel: email_tel }] })

        if (!users.length) {
            req.flash('errMessage', 'No account found with these credentials!')
            return res
                .redirect('/login')
        }

        const user = users[0]

        const hashedPassword = hash(password, process.env.PASSWORD_SECRET)

        if (user.password === hashedPassword) {
            const at = generateTokens({ _id: user._id }, process.env.AT_SECRET, '3d')
            const rt = generateTokens({ _id: user._id }, process.env.RT_SECRET, '1y')

            // req.flash('successMessage', 'Logged in Successfully!')
            res.cookie('at', at)
            res.cookie('rt', rt)
            return res
                .redirect('/')
        }

        req.flash('errMessage', 'Invalid credentials!')
        return res
            .redirect('/login')

    }

}

module.exports = new LoginController()