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
}

module.exports = new PromoService()