const categoryService = require("../../services/categoryService")

class CategoryController {

    async renderCategoriesView(req, res) {
        const categories = await categoryService.findCategories()
        const subCategories = await categoryService.findSubCategories()
        return res.status(200).render('admin/categories', {
            categories,
            subCategories,
            err: req.flash('err'),
            success: req.flash('success'),
        })
    }

    async createNewCategory(req, res) {
        const { title } = req.body
        if (!title) {
            req.flash('err', 'Enter a valid category')
            return res.status(422).redirect('/admin/categories/all')
        }

        const exists = await categoryService.findCategory(title)
        if (exists) {
            req.flash('err', 'category already exists')
            return res.status(422).redirect('/admin/categories/all')
        }

        const create = await categoryService.createCategory({ title })
        if (create) {
            req.flash('success', 'Category created')
            return res.status(201).redirect('/admin/categories/all')
        }
        req.flash('err', 'Something went wrong')
        return res.status(500).redirect('/admin/categories/all')
    }

    async createNewSubCategory(req, res) {
        const { title } = req.body
        if (!title) {
            req.flash('err', 'Enter a valid sub-category')
            return res.status(422).redirect('/admin/categories/all')
        }

        const exists = await categoryService.findSubCategory(title)
        if (exists) {
            req.flash('err', 'sub-category already exists')
            return res.status(422).redirect('/admin/categories/all')
        }

        const create = await categoryService.createSubCategory({ title })
        if (create) {
            req.flash('success', 'Sub-category created')
            return res.status(201).redirect('/admin/categories/all')
        }
        req.flash('err', 'Something went wrong')
        return res.status(500).redirect('/admin/categories/all')
    }

}

module.exports = new CategoryController()