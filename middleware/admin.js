const userService = require('../services/user-service');

const admin = async (req, res, next) => {
    const userId = req._id;

    const adminUser = await userService.findUser({
        _id: userId,
        role: 'admin'
    })

    if (adminUser) {
        return next()
    }

    return res.status(401).json({ err: 'Unauthorized access!' })
}

module.exports = admin;