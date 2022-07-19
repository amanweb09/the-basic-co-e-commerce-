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
                .render('admin/createProduct', { categories, subCategories })
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .render('admin/createProduct')
        }

    }

    async createProduct(req, res) {
        console.log(req.body);
    //     const { title, price, desc, category, subCategory, tags, images, variants, availability, season } = req.body

    //     if (!title || !price || !desc || !category || !images || !variants || !availability || !season) {
    //         req.flash('err', 'All fields are required')
    //         return res
    //             .redirect('/admin/products/create')
    //         // return res
    //         //     .status(422)
    //         //     .json('all fields are required')
    //     }

    //     const cat = await categoryService.findCategory(category)
    //     const subCat = await categoryService.findSubCategory(subCategory)

    //     const product = {
    //         ...req.body,
    //         category: { categoryId: cat._id, title: category },
    //         subCategory: { subCategoryId: subCat._id, title: subCategory }
    //     }

    //     const saveProduct = await productService.createProduct(product)

    //     if (saveProduct) {

    //         if (!cat.products) {
    //             cat.products = []
    //         }
    //         if (!subCat.products) {
    //             subCat.products = []
    //         }

    //         cat.products.unshift(saveProduct._id)
    //         subCat.products.unshift(saveProduct._id)

    //         req.flash('success', 'Product created successfully!')
    //         return res
    //             .redirect('/admin/products/create')
    //         // return res
    //         //     .status(201)
    //         //     .json('success')
    //     }
    //     req.flash('err', 'Server unavailable! Please try again')
    //     return res
    //         .redirect('/admin/products/create')
    }

}


module.exports = new AdminProductController()