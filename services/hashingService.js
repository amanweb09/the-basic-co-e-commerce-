const { createHmac } = require('crypto')

class HashingService {

    hash(doc, secret) {
        return createHmac('sha256', secret)
            .update(doc)
            .digest('hex')
    }

}

module.exports = new HashingService()