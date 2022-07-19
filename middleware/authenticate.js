const { validateToken } = require('../services/tokenService');
const { findUsers } = require('../services/userService')

const authenticate = async (req, res, next) => {
    const { accessToken } = req.cookies;

    if (!accessToken) {
        req.flash('errMessage', 'Please login to continue!')
        return res
            .status(401)
            .redirect('/login')
    }

    const payload = validateToken(accessToken, process.env.AT_SECRET)

    if (payload) {
        const authUser = await findUsers({ _id: payload._id });
        req._id = authUser[0]._id;
        req.name = authUser[0].name;
        req.email = authUser[0].email;
        req.tel = authUser[0].tel;

        return next()
    }

    req.flash('errMessage', 'Please login to continue!')
    return res
        .status(401)
        .redirect('/login')

}

module.exports = authenticate;