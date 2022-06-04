const { Schema, model } = require('mongoose')

const subCategorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'products',
            unique: false,
            required: false
        }
    ]
})

module.exports = new model('subCategories', subCategorySchema, 'subCategories')