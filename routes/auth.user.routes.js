const express = require("express");
const userRegistrationValidator = require("../validators/user.registration.validator");
const { registration, login } = require("../controllers/auth.user.controller");

require("dotenv").config()

// const adminLoginValidator = require("../validators/admin.login.validator");
// const { login, regenerateToken, kotakNeoAccessToken, kotakNeoLogin } = require("../controllers/auth.admin.controller");
// const isAuth = require("../utils/token.util");
// const { getScript, getPositionBook, getPortfolioHoldings } = require("../controllers/kotak.operations.admin.controller");
// const accessTokenVerify = require("../middlewares/accessToken.kotak.middleware");

const user_route = express.Router()
const INITURL = process.env.INITURL

user_route.post(`${INITURL}/registration`, userRegistrationValidator,registration)
user_route.post(`${INITURL}/login`, userRegistrationValidator,login)
// user_route.post(`${INITURL_USER}/login`, adminLoginValidator,login)
// user_route.get(`${INITURL_USER}/regenerateToken`, regenerateToken)

module.exports = user_route