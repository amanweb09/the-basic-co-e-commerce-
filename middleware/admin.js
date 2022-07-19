const { findUsers } = require('../services/userService');

const admin = async (req, res, next) => {
    const userId = req._id;

    const adminUser = await findUsers({
        _id: userId,
        role: 'admin'
    })

    if (adminUser) {
        return next()
    }

    return res
        .status(401)
        .redirect('/login')
}

module.exports = admin;