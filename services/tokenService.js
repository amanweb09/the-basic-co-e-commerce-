const { sign } = require('jsonwebtoken')

class TokenService {

    generateTokens(payload, secret, exp) {
        return sign(payload, secret, {
            expiresIn: exp
        })
    }

}   

module.exports = new TokenService()