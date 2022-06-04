const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    title: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    desc: { type: String, required: true },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        unique: false
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: 'subCategories',
        unique: false,
        required: false
    },
    tags: {
        type: [String],
        required: false
    },
    images: {
        primary: {
            type: String,
            required: true
        },
        sec: {
            type: [String],
            required: false
        }
    },
    variants: {
        colors: {
            type: [String],
            required: true
        },
        colors: {
            type: [String],
            required: true
        }
    },
    availability: {
        inStock: {
            type: Boolean,
            default: true
        },
        units: {
            type: Number,
            required: true
        }
    },
    season: {
        type: String,
        required: true
    }
},
    { timeStamps: true })

module.exports = new model('products', productSchema, 'products')