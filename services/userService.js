const Users = require('../models/user')

class UserService {

    async findUsers(filter) {
        try {
            return await Users.find(filter)
        } catch (error) {
            return error
        }
    }

    async createUser(user) {
        try {
            return await Users.create(user)
        } catch (error) {
            return error
        }
    }

}

module.exports = new UserService()