const tokenService = require('../services/token-service');
const userService = require('../services/user-service')

const authenticate = async (req, res, next) => {
    const { accessToken } = req.cookies;

    if (!accessToken) {
        return res
            .status(401)
            .json({ err: 'Unauthorized access!' })
    }

    const payload = await tokenService.validateToken(accessToken)

    if (payload) {
        const authUser = await userService.findUser({ _id: payload._id });
        req._id = authUser._id;
        req.name = authUser.name;
        req.email = authUser.email;
        req.tel = authUser.tel;

        return next()
    }

    return res
        .status(401)
        .json({ err: 'Unauthorized access!', expErr: true })

}

module.exports = authenticate;