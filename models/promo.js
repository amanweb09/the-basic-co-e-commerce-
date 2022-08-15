const {Schema, model} = require('mongoose')

const promoSchema = new Schema({
    code: {
        type: String, required: true, unique: true
    },
    type: {
        type: String,
        default: 'percentage',
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        required: true
    },
    minimumAmount: {
        isRequired: {type: Boolean, default: false},
        amount: {type: Number, required: false}
    }
})

module.exports = new model('promos', promoSchema, 'promos')