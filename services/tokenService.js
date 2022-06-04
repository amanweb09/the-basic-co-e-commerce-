const { sign, verify } = require('jsonwebtoken')

class TokenService {

    generateTokens(payload, secret, exp) {
        return sign(payload, secret, {
            expiresIn: exp
        })
    }

    validateToken(token, secret) {
        const val = verify(token, secret)
        console.log(val);
        return val
    }

}   

module.exports = new TokenService()