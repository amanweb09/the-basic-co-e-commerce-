class OrderController {
    renderCheckout(req, res) {
        return res.status(200).render('checkout')
    }

    initPayment(req, res) {
        
    }
}

module.exports = new OrderController()