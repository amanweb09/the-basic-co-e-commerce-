const userService = require("../../services/userService")
const tokenService = require("../../services/tokenService")
const hashingService = require("../../services/hashingService")


class PasswordController {

    renderForgetPage(req, res) {
        return res.status(200).render('forget_password', {
            err: req.flash('err'),
            success: req.flash('success')
        })
    }

    async buildResetLink(req, res) {
        const { email } = req.body

        if (!email) {
            req.flash('err', 'Please enter an email ID')
            return res.status(422).redirect('/forget-password')
        }

        const users = await userService.findUsers({ email })

        if (!users.length) {
            req.flash('err', 'No user found with this email ID')
            return res.status(404).redirect('/forget-password')
        }

        const user = users[0]
        const exp = 1000 * 60 * 10
        const resetToken = tokenService.generateTokens({ _id: user._id }, process.env.PASSWORD_RESET_SECRET, '10m')

        const link = `${process.env.BASE_URL}/reset-password/${resetToken}*${Date.now() + exp}`

        user.resetToken = resetToken
        try {
            await user.save()
        } catch (error) {
            console.log(error);
            req.flash('err', 'Something went wrong!')
            return res.status(500).redirect('/forget-password')
        }

        if (process.env.NODE_ENV === 'production') {

        }
        else {
            console.log(link);
        }
        req.flash('success', 'Password reset link has been sent to your email!')
        return res.status(200).redirect('/forget-password')
    }

    verifyResetLink(req, res) {
        const { link } = req.params
        if (!link) {
            req.flash('err', 'Invalid Request')
            return res.status(422).redirect('/forget-password')
        }

        const [token, timestamp] = link.split('*')

        if (parseInt(timestamp) < Date.now()) {
            req.flash('err', 'Link has expired')
            return res.status(422).redirect('/forget-password')
        }

        const payload = tokenService.validateToken(token, process.env.PASSWORD_RESET_SECRET)

        if (payload && payload != null) {
            return res.status(200).render('reset-password', {
                link
            })
        }
        else {
            req.flash('err', 'Link has expired')
            return res.status(422).redirect('/forget-password')
        }
    }

    async updatePassword(req, res) {
        const { password, c_password } = req.body
        const { link } = req.params

        if (!password || !c_password || !link) {
            req.flash('err', 'all fields are required')
            return res.status(422).redirect('/forget-password')
        }
        if (password !== c_password) {
            req.flash('err', "password and confirm password don't match")
            return res.status(422).redirect('/forget-password')
        }
        const [token, timestamp] = link.split('*')
        const payload = tokenService.validateToken(token, process.env.PASSWORD_RESET_SECRET)

        if (payload && payload != null) {
            const users = await userService.findUsers({ _id: payload._id })

            if (!users.length) {
                req.flash('err', 'User not found')
                return res.status(404).redirect('/forget-password')
            }

            const user = users[0]
            const hashedPassword = hashingService.hash(password, process.env.PASSWORD_SECRET)

            user.password = hashedPassword
            user.resetToken = ''
            try {
                await user.save()
                req.flash('successMessage', 'Password updated successfully!')
                return res.status(200).redirect('/login')
            } catch (error) {
                console.log(error);
                req.flash('err', 'Something went wrong!')
                return res.status(500).redirect('/forget-password')
            }
        }
        else {
            req.flash('err', 'Link has expired')
            return res.status(422).redirect('/forget-password')
        }
    }
}

module.exports = new PasswordController()