const { sign, verify } = require('jsonwebtoken')

class TokenService {

    generateTokens(payload, secret, exp) {
        return sign(payload, secret, {
            expiresIn: exp
        })
    }

    validateToken(token, secret) {
        return verify(token, secret)
    }

}   

module.exports = new TokenService()