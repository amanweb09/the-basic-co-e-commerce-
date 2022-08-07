const Joi = require('joi')

const schema = Joi.object({
    orderId: Joi.string().min(2).required(),
    customer: Joi
        .string()
        .min(2)
        .required(),
    address: Joi
        .object()
        .required(),
    totalPrice: Joi
        .number()
        .min(2)
        .required(),
    shipping: Joi
        .string()
        .min(2)
        .required(),
    status: Joi
        .string()
        .default('placed'),
    products: Joi
        .array()
        .min(1)
        .required(),
    promoCode: {
        isApplied: Joi.boolean().default(false),
        code: Joi.string().min(0)
    },
    payment: {
        status: Joi.boolean().default(false),
        method: Joi.string().required(),
        razorpay: Joi.object().min(0)
    }
})

module.exports = async function (doc) {
    try {
        return schema.validateAsync(doc)
    } catch (error) {
        return error
    }
}