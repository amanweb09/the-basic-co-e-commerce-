const { findPromo, createPromo, updatedPromo, deletePromoCode } = require('../../services/promoService')

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

    async changePromoStatus(req, res) {
        const { _id, status } = req.body

        if (!_id || !status) {
            return res.status(422).json({ err: 'Promo ID and Status are Required!' })
        }

        const changes = await updatedPromo(_id, { status })
        if (changes) {
            return res.status(200).json({ message: 'Status Updated Successfully!' })
        }

        return res.status(500).json({ err: 'Internal Server Error!' })
    }

    async deletePromo(req, res) {
        const { _id } = req.body
        if (!_id) {
            return res.status(422).json({ err: 'Promo ID is Required!' })
        }

        const delCode = await deletePromoCode(_id)

        if(delCode) {
            return res.status(200).json({ message: 'Code Deleted Successfully!' })
        }

        return res.status(500).json({ err: 'Internal Server Error!' })
    }
}

module.exports = new PromoController()