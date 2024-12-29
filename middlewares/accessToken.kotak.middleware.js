const TokenModel = require("../models/token.model")

const accessTokenVerify = async (req, res, next) => {
    const data = await TokenModel.findOne({ _id: req._id })
    const currentDate = new Date()
    const expiresAt = new Date(data.expiresAt)
    console.log(`currentDate,expiresAt`,currentDate,expiresAt);
    if(currentDate > expiresAt){
        return res.status(403).json({msg:"Token is invalid or expired",expired:true})
    }
    req.accessToken = data.token
    req.sid = data.sid
    req.token = data.viewToken
    next()
}

module.exports = accessTokenVerify