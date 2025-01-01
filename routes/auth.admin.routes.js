const express = require("express");
const adminLoginValidator = require("../validators/admin.login.validator");
const { login, kotakNeoAccessToken, kotakNeoLogin } = require("../controllers/auth.admin.controller");
const isAuth = require("../utils/token.util");
const { getScript, getPositionBook, getPortfolioHoldings } = require("../controllers/kotak.operations.admin.controller");
const accessTokenVerify = require("../middlewares/accessToken.kotak.middleware");

require("dotenv").config()

const admin_route = express.Router()

admin_route.post(`/login`, adminLoginValidator,login)

admin_route.use(isAuth)
admin_route.post(`/kotakNeoAccessToken`, kotakNeoAccessToken)
admin_route.post(`/kotakNeoLogin`, kotakNeoLogin)
admin_route.get(`/kotakNeoScript`,accessTokenVerify, getScript)
admin_route.get(`/kotakNeoPositionBook`,accessTokenVerify, getPositionBook)
admin_route.get(`/kotakNeoPortfolioHolding`, accessTokenVerify, getPortfolioHoldings)

module.exports = admin_route