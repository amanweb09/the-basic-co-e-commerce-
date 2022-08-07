class CustomerOrderController {

    renderOrders(req, res) {
        return res.status(200).render('orders', {
            success: req.flash('success'),
            err: req.flash('err')
        })
    }
}

module.exports = new CustomerOrderController()