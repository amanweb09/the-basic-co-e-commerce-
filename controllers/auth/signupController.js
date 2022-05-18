const userService = require('../../services/userService')
const userValidator = require('../../validators/userValidator')
const { ValidationError } = require('joi');
const { hash } = require('../../services/hashingService');

class SignupController {
    render(req, res) {
        return res
            .status(200)
            .render('signup', {
                errMessage: req.flash('errMessage'),
                successMessage: req.flash('successMessage')
            })
    }

    async createUser(req, res) {
        const { name, email, tel, password } = req.body;

        if (!name || !email || !tel || !password) {

            req.flash('errMessage', 'Please fill in all the fields!')
            return res
                .redirect('/signup')
        }

        const validate = await userValidator({ name, email, tel, password })

        if (validate instanceof ValidationError) {
            req.flash('errMessage', validate.details[0].message)
            return res
                .redirect('/signup')
        }

        const existingUsers = await userService.findUsers({ $or: [{ email }, { tel }] })

        if (existingUsers.length) {
            req.flash('errMessage', 'User already exists with this Email or Contact Number!')
            return res
                .redirect('/signup')
        }

        const hashedPassword = hash(password, process.env.PASSWORD_SECRET)

        const user = {
            name, email, tel, password: hashedPassword
        }

        const saveUser = await userService.createUser(user)

        if (saveUser) {
            req.flash('successMessage', 'Signup successful! Please login')
            return res
                .redirect('/login')
        }

        else {
            req.flash('errMessage', 'Something went wrong!')
            return res
                .redirect('/signup')
        }

    }
}

module.exports = new SignupController()