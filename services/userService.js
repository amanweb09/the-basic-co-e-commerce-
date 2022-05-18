const Users = require('../models/user')

class UserService {

    async findUsers(filter) {
        try {
            return await Users.find(filter)
        } catch (error) {
            return error
        }
    }

}

module.exports = new UserService()