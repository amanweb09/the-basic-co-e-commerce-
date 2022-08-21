const categoryService = require("../../services/categoryService")
const productService = require("../../services/productService")
const Categories = require('../../models/category')
const SubCategories = require('../../models/subCategory')
const cld = require('../../util/cld')
const cloudinary = require('cloudinary').v2

class AdminProductController {

    async renderProductPanel(req, res) {

        try {
            const categories = await Categories.find()
            const subCategories = await SubCategories.find()

            return res
                .status(200)
                .render('admin/createProduct', {
                    categories, subCategories,
                    successMessage: req.flash('success'),
                    errMessage: req.flash('err')
                })
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .render('admin/createProduct')
        }

    }

    async createProduct(req, res) {

        const { title, price, desc, category, subCategory, season, sizes: sizeString, colors: colorsString } = req.body

        if (!title || !price || !desc || !category || !subCategory || !sizeString || !colorsString || !season) {
            req.flash('err', 'All fields are required')
            return res
                .redirect('/admin/products/create')
        }

        const cat = await categoryService.findCategory(category)
        const subCat = await categoryService.findSubCategory(subCategory)

        const sizes = sizeString.split(',')
        const colors = colorsString.split(',')

        let tags = [];

        if (req.body.tags) {
            tags = req.body.tags
            tags = tags.split(',')
        }

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
        const imageP = req.files.imgPrimary
        const imageS = req.files.imgSec || []

        let image_p_url;
        let image_s_url = [];

        for (let i = 0; i < imageS.length; i++) {
            const element = imageS[i];
            async function upload() {
                try {
                    const { url } = await cld(element)
                    image_s_url.push(url)
                } catch (error) {
                    return error
                }
            }
            await upload()
        }

        const data = await cld(imageP)
        if (data) { image_p_url = data.url }

        const product = {
            title, price, desc, season, tags,
            variants: {
                colors,
                sizes: sizes
            },
            images: {
                primary: image_p_url,
                sec: image_s_url
            },
            category: { categoryId: cat._id, title: category },
            subCategory: { subCategoryId: subCat._id, title: subCategory },
            availability: {
                inStock: true,
                units: req.body.units || 5
            }
        }

        const saveProduct = await productService.createProduct(product)

        if (saveProduct) {

            if (!cat.products) {
                cat.products = []
            }
            if (!subCat.products) {
                subCat.products = []
            }

            cat.products.unshift(saveProduct._id)
            subCat.products.unshift(saveProduct._id)

            try {
                await cat.save()
                await subCat.save()

                req.flash('success', 'Product created successfully!')
                return res
                    .redirect('/admin/products/create')

            } catch (error) {
                console.log(error);
                req.flash('err', 'Server unavailable! Please try again')
                return res
                    .redirect('/admin/products/create')
            }

        }
        req.flash('err', 'Server unavailable! Please try again')
        return res
            .redirect('/admin/products/create')
    }

}


module.exports = new AdminProductController()