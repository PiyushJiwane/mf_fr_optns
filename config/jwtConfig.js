const jwt = require("jsonwebtoken")

require('dotenv').config();

const JWT_TOKEN_EXPIRES_IN = process.env.JWT_TOKEN_EXPIRES_IN

const jwtFn = async (userId,secretKey) => {        
    const jwt_token = await jwt.sign({
        _id: userId
    }, secretKey, {
        expiresIn:JWT_TOKEN_EXPIRES_IN
    })
    return jwt_token
}

module.exports = jwtFn