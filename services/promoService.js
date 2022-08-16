const Promos = require('../models/promo')

class PromoService {

    async findPromo(filter) {
        try {
            return await Promos.find(filter)
        } catch (error) {
            return error
        }
    }

    async createPromo(promo) {
        try {
            return await Promos.create(promo)
        } catch (error) {
            return error
        }
    }

    async updatedPromo(_id, changes) {
        try {
            return await Promos.updateOne({ _id }, changes)
        } catch (error) {
            return error
        }
    }

    async deletePromoCode(_id) {
        try {
            return await Promos.deleteOne({ _id })
        } catch (error) {
            return error
        }
    }
}

module.exports = new PromoService()