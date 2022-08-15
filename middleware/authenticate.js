const { validateToken } = require('../services/tokenService');
const { findUsers } = require('../services/userService')
const { TokenExpiredError } = require('jsonwebtoken')

const authenticate = async (req, res, next) => {

    const originalUrl = req.originalUrl
    req.session.returnTo = originalUrl
    if (!req.cookies) {
        req.flash('errMessage', 'Please login to continue!')
        return res
            .status(401)
            .redirect('/login')
    }

    const { at } = req.cookies;

    if (!at) {
        req.flash('errMessage', 'Please login to continue!')
        return res
            .status(401)
            .redirect('/login')
    }

    const payload = validateToken(at, process.env.AT_SECRET)

    if (payload) {
        try {
            const authUser = await findUsers({ _id: payload._id });
            req.user = authUser[0]

            return next()
        } catch (error) {
            req.flash('errMessage', 'Internal Server Error!')
            return res
                .status(500)
                .redirect('/login')
        }
    }
    else {
        req.flash('errMessage', 'Please login to continue!')
        return res
            .status(401)
            .redirect('/login')
    }

}

module.exports = authenticate;