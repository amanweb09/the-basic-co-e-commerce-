const { sign, verify, TokenExpiredError } = require('jsonwebtoken')

class TokenService {

    generateTokens(payload, secret, exp) {
        return sign(payload, secret, {
            expiresIn: exp
        })
    }

    validateToken(token, secret) {
        return verify(token, secret, (err, payload) => {
            if (err) {
                return null
            }
            if (payload) {
                return payload
            }
        })

    }

}   

module.exports = new TokenService()