const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    tel: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: false },
    role: { type: String, default: 'user' },
    accessToken: { type: String },
    resetToken: { type: String }
})

module.exports = new model('users', userSchema, 'users')