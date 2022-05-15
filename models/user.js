const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    tel: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accessToken: { type: String },
    refreshToken: { type: String }
})

module.exports = new model('users', userSchema, 'users')