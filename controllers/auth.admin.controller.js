const jwtFn = require("../config/jwtConfig")
const logger = require("../config/logConfig")
const AdminModel = require("../models/admin.model")
const RefreshTokenModel = require("../models/token.model")
const cookieOptions = require("../config/config")
const jwt = require("jsonwebtoken")
const { default: axios } = require("axios")
const TokenModel = require("../models/token.model")
const loggerUtil = require("../utils/logger.util")
const { ACCESSTOKEN_KOTAK_URL, FINALTOKEN_KOTAK_URL, OTP_KOTAK_URL } = require("../constants/KotakUrl")

require('dotenv').config();

const JWT_SECRETE_KEY = process.env.JWT_SECRETE_KEY
const JWT_REFRESHTOKEN_SECRETE_KEY = process.env.JWT_REFRESHTOKEN_SECRETE_KEY

const kotakNeoAccessToken = async (req, res) => {
    const { mobileNumber, password, consumerKey, consumerSecreteKey } = req.body

    const data_fr_accessToken = new URLSearchParams({
        'grant_type': 'client_credentials',
    });

    const data_fr_finalToken = {
        mobileNumber,
        password
    }

    const authHeader = "Basic " + Buffer.from(consumerKey + ":" + consumerSecreteKey).toString('base64');

    console.log(`authHeader : `,authHeader);

    try {
        const accessTokenResp = await axios.post(ACCESSTOKEN_KOTAK_URL, data_fr_accessToken, {
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        const accessToken = accessTokenResp.data.access_token

        const tokenResp = await axios.post(FINALTOKEN_KOTAK_URL, data_fr_finalToken, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        // step 1 view token
        const viewToken = tokenResp.data.data.token
        const sid = tokenResp.data.data.sid
        const userId = jwt.decode(viewToken).sub;
        const data_fr_otp = {
            userId,
            sendEmail: true,
            isWhiteListed: true
        }
        await axios.post(OTP_KOTAK_URL, data_fr_otp, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })

        res.status(200).json({
            data: {
                userId,
                sid,
                accessToken,
                viewToken
            }
        })
    } catch (error) {
        loggerUtil("error", "kotakNeoAccessToken", error.response?.data || error.message)
        return res.status(500).json({ msg: error.response?.data || error.message })
    }
}

const kotakNeoLogin = async (req, res) => {
    const { userId, otp, sid, accessToken, token } = req.body
    const now = new Date();

    const data_fr_finalSessionToken = {
        userId,
        otp
    }
    try {
        const finalSessionToken = await axios.post(FINALTOKEN_KOTAK_URL, data_fr_finalSessionToken, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'sid': sid,
                'Auth': token,
                'Authorization': `Bearer ${accessToken}`
            }
        })
        await TokenModel.findOneAndUpdate({ _id: req._id },
            { userId, sid, token:accessToken,viewToken:token, finalToken: finalSessionToken.data.data.token, expiresAt: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 1) }, { upsert: true })

        res.cookie("accessToken", finalSessionToken.data.data.token, cookieOptions(1, "access"))
        loggerUtil("info", "kotakNeoLogin", "kotakNeoLogin success")
        res.status(200).json({ data: "kotakNeoLogin fn", success: true })
    } catch (error) {
        loggerUtil("error", "kotakNeoLogin", error.response?.data || error.message)
        return res.status(500).json({ msg: error.response?.data || error.message })
    }
}

const login = async (req, res) => {
    console.log(req.path)
    const { password } = req.body
    try {
        const admin = await AdminModel.findOne({ username: "admin", password })
        if (!admin) {
            logger.warn({
                message: {
                    method: "login",
                    msg: "invalid username or password"
                }
            })
            return res.status(401).json({
                msg: "invalid username or password"
            })
        }
        const jwt_token = await jwtFn(admin._id, JWT_SECRETE_KEY)
        const jwt_refresh_token = await jwtFn(admin._id, JWT_REFRESHTOKEN_SECRETE_KEY)

        await RefreshTokenModel.findByIdAndUpdate(admin._id, {
            _id: admin._id,
            refreshToken: jwt_refresh_token
        }, { upsert: true })

        // await kotakNeo()

        res.cookie("refreshToken", jwt_refresh_token, cookieOptions(10))
        // // for testing and dev env
        // res.cookie("jwtToken", jwt_token, cookieOptions(1, "access"))

        // // for production env
        res.cookie("jwtToken", jwt_token, cookieOptions(1))

        logger.info({
            message: {
                method: "login",
                msg: "login success"
            }
        })
        res.status(200).json({ data: "login fn" })
    } catch (error) {
        logger.error({
            message: {
                method: "login",
                msg: error.message
            }
        })
    }
}


module.exports = {
    login, kotakNeoAccessToken, kotakNeoLogin
}