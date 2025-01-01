const express = require("express");
const isAuth = require("../utils/token.util");
const { getUserList, updateSubscription } = require("../controllers/dashboard.admin.controller");

require("dotenv").config()

const dashboard_route = express.Router()

dashboard_route.use(isAuth)
dashboard_route.get(`/getUserList`, getUserList)
dashboard_route.put(`/updateSubscription`, updateSubscription)

module.exports = dashboard_route