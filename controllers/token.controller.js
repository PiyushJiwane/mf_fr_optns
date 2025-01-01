const jwtFn = require("../config/jwtConfig")
const logger = require("../config/logConfig")
const cookieOptions = require("../config/config")
const jwt = require("jsonwebtoken")

require("dotenv").config()

const JWT_SECRETE_KEY = process.env.JWT_SECRETE_KEY
const JWT_REFRESHTOKEN_SECRETE_KEY = process.env.JWT_REFRESHTOKEN_SECRETE_KEY

const regenerateToken = async (req, res) => {
    try {
        const { refreshToken} = req.body
        if (!refreshToken) {
            logger.warn({
                message: {
                    method: "regenrateToken",
                    msg: "invalid refresh token"
                }
            })
            return res.status(401).json({
                msg: "invalid refresh token"
            })
        }
        jwt.verify(refreshToken, JWT_REFRESHTOKEN_SECRETE_KEY, async (err, decoded) => {
            if (err) return res.sendStatus(403);

            const user = refreshTokenModel.findOne(decoded._id) // Invalid token

            if (!user) return res.sendStatus(403);

            const jwt_token = await jwtFn(admin._id, JWT_SECRETE_KEY)
            res.cookie("jwtToken", jwt_token, cookieOptions(1, "access"))
            logger.info({
                message: {
                    method: "regenerateToken",
                    msg: "login success"
                }
            })
            res.status(200).json({ data: "regenerateToken fn" })
        });
    } catch (error) {
        logger.error({
            message: {
                method: "regenrateToken",
                msg: error.message
            }
        })
    }
}

module.exports = {
    regenerateToken
} 