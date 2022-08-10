const { findOrders } = require('../../services/orderService')
const moment = require('moment')

class DashboardController {

    async buildDashboard(req, res) {
        const prevYear = new Date().getFullYear() - 1
        const prevDate = new Date(`${prevYear}`).toISOString()
        const currentDate = new Date().toISOString()

        const orders = await findOrders({
            createdAt: {
                $gte: prevDate,
                $lte: currentDate
            },
            status: { $ne: 'cancelled' }
        })

        //month-wise sales
        const monthWiseSale = {}
        let totalSales = 0

        orders.forEach((order) => {
            const month = moment(order.createdAt).format('MMMM').toLowerCase()

            if (!monthWiseSale[month]) {
                monthWiseSale[month] = 0
            }
            monthWiseSale[month] += order.totalPrice
            totalSales += order.totalPrice
        })

        //payment method-wise sales
        const cashOrders = orders.filter((order) => {
            return order.payment.method === 'COD'
        })
        const rpOrders = orders.filter((order) => {
            return order.payment.method === 'razorpay'
        })

        const paymentWiseSales = {
            cash: cashOrders.length,
            razorpay: rpOrders.length
        }

        //pending orders
        function ordersByStatus(status) {
            return orders.filter((order) => {
                return order.status === status
            })
        }

        //status-wise orders
        const statusWiseOrders = {
            completed: ordersByStatus('completed').length,
            new: ordersByStatus('placed').length,
            pending: orders.length - ordersByStatus('completed').length - ordersByStatus('placed').length
        }

        return res.status(200).render('admin/dashboard', {
            monthWiseSale,
            paymentWiseSales,
            totalSales,
            statusWiseOrders,
            username: req.user.name,
            date: moment(Date.now()).format('MMMM DD YYYY')
            // date: `${new Date().getDate()} ${moment(new Date().getMonth()).format('MMMM')}, ${new Date().getFullYear()}`
        })

    }

}

module.exports = new DashboardController()