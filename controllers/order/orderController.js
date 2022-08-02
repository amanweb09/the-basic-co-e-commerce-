class OrderController {
    renderCheckout(req, res) {
        return res.status(200).render('checkout')
    }
}

module.exports = new OrderController()