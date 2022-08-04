const Razorpay = require('razorpay')
const instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })

async function createOrder({ amount, userId }) {

    try {
        return await instance.orders.create({
            amount,
            currency: "INR",
            receipt: Math.floor(Math.random() * 1E9),
            notes: {
                "userId": userId
            }
        })
        
    } catch (error) {
        return error
    }

}

async function fetchOrder(id) {
    try {
        return await instance.orders.fetch(id)
    } catch (error) {
        return error
    }
}

module.exports.createOrder = createOrder
module.exports.fetchOrder = fetchOrder