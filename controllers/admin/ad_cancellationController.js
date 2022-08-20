const Cancellations = require('../../models/cancellation')

class AdminCancellationController {

    async renderCancellationView(req, res) {
        let requests = []

        try {
            requests = await Cancellations.find({ status: 'posted' })
        } catch (error) {
            console.log(error);
        }

        return res.status(200).render('admin/cancellations', {
            requests
        })
    }

    async changeRequeststatus(req, res) {
        const { status, _id } = req.body

        try {
            await Cancellations.updateOne({ _id }, { status })
            return res.status(200).json({ message: 'status updated' })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ err: 'Internal server error' })
        }
    }
}

module.exports = new AdminCancellationController()