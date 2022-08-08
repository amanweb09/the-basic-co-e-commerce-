const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        unique: false,
        required: true
    },
    address: {
        customerName: { type: String },
        customerTel: { type: String },
        addressLine1: { type: String, required: true },
        addressLine2: { type: String, required: true },
        landmark: { type: String, required: true },
        state: { type: String, required: true },
        pin: { type: String, required: true },
        country: { type: String, required: true },
    },
    products: [
        {
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'products',
                required: true,
                unique: false
            },
            variants: [
                {
                    color: {
                        type: String,
                        required: true
                    },
                    size: {
                        type: String,
                        required: true
                    },
                    qty: {
                        type: Number,
                        required: true
                    },
                }
            ]
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    shipping: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'placed'
    },
    promoCode: {
        isApplied: {
            type: Boolean,
            default: false
        },
        code: {
            type: String,
            required: false
        }
    },
    payment: {
        status: {
            type: Boolean,
            default: false
        },
        method: {
            type: String,
            required: true,
            default: 'cash'
        },
        razorpay: {
            razorpay_payment_id: {
                type: String
            },
            razorpay_order_id: {
                type: String
            },
            razorpay_signature: {
                type: String
            }
        }
    }
}, { timestamps: true })

module.exports = new model('orders', orderSchema, 'orders')
