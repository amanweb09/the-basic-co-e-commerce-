const categoryService = require("../../services/categoryService")
const productService = require("../../services/productService")
const Categories = require('../../models/category')
const SubCategories = require('../../models/subCategory')

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

        const { title, price, desc, category, subCategory, imgPrimary, season, sizes: sizeString, colors: colorsString } = req.body

        if (!title || !price || !desc || !category || !subCategory || !imgPrimary || !sizeString || !colorsString || !season) {
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

        const product = {
            title, price, desc, season, tags,
            variants: {
                colors,
                sizes: sizes
            },
            images: {
                primary: imgPrimary,
                sec: req.body.imgSec ? req.body.imgSec : []
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