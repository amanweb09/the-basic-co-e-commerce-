const Joi = require('joi')

const schema = Joi.object({
    name: Joi
        .string()
        .min(2)
        .required(),
    email: Joi
        .string()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'net']
            }
        }),
    tel: Joi
        .string()
        .min(8)
        .required(),
    password: Joi
        .string()
        .min(4)
        .required()
})

module.exports = async function(doc) {
    try {
        return await schema.validateAsync(doc)
    } catch (error) {
        return error
    }
}
