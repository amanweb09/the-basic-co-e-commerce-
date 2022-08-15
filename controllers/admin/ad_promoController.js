const { findPromo, createPromo } = require('../../services/promoService')

class PromoController {

    async renderPromo(req, res) {
        const promos = await findPromo()
        return res.status(200).render('admin/promo', {
            success: req.flash('success'),
            err: req.flash('err'),
            promos
        })   
    }

    async createPromo(req, res) {
        const { code, type, value, status } = req.body

        if (!code || !type || !value || !status) {
            req.flash('err', 'All Fields Are Required!')
            return res.status(422).redirect('/admin/promo')
        }

        const exists = await findPromo({ code })

        if (exists.length) {
            req.flash('err', 'Code Already Exists!')
            return res.status(422).redirect('/admin/promo')
        }

        const promo = {
            code, type, value, status,
            minimumAmount: req.body.minimumAmount ? {
                amount: req.body.minimumAmount, isRequired: true
            } : {
                amount: 0, isRequired: false
            }
        }

        const create = await createPromo(promo)
        if (create) {
            req.flash('success', 'Promo Code Created Successfully!')
            return res.status(422).redirect('/admin/promo')
        }

        req.flash('err', 'Something Went Wrong!')
        return res.status(422).redirect('/admin/promo')
    }
}

module.exports = new PromoController()