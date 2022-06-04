const Categories = require('../models/category')
const SubCategories = require('../models/subCategory')

class CategoryService {

    async findCategory(category) {
        try {
            return await Categories.findOne({ title: category })
        } catch (error) {
            return error
        }
    }

    async findSubCategory(subCategory) {
        try {
            return await SubCategories.findOne({ title: subCategory })
        } catch (error) {
            return error
        }
    }

}

module.exports = new CategoryService()