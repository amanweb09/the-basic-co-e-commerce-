const Categories = require('../models/category')
const SubCategories = require('../models/subCategory')

class CategoryService {

    async findCategory(category) {
        try {
            return await Categories
                .findOne({ title: category })
                .select('title')
                .exec()
        } catch (error) {
            return error
        }
    }

    async findSubCategory(subCategory) {
        try {
            return await SubCategories
                .findOne({ title: subCategory })
                .select('title')
                .exec()
        } catch (error) {
            return error
        }
    }

    async findSubCategories(filter) {
        try {
            return await SubCategories
                .find(filter)
                .select('title')
                .exec()

        } catch (error) {
            return error
        }
    }

    async findCategories(filter) {
        try {
            return await Categories
                .find(filter)
                .select('title')
                .exec()
        } catch (error) {
            return error
        }
    }

    async createCategory(category) {
        try {
            return await Categories.create(category)
        } catch (error) {
            return error
        }
    }

    async createSubCategory(subCategory) {
        try {
            return await SubCategories.create(subCategory)
        } catch (error) {
            return error
        }
    }
}

module.exports = new CategoryService()