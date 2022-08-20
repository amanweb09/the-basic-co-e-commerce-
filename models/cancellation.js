const { Schema, model } = require('mongoose')

const cancellationSchema = new Schema({
    orderId: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'posted'
    }
}, { timestamps: true })

module.exports = new model('cancellations', cancellationSchema, 'cancellations')