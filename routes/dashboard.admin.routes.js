const express = require("express");
const isAuth = require("../utils/token.util");
const { getUserList } = require("../controllers/dashboard.admin.controller");

require("dotenv").config()

const dashboard_route = express.Router()
const INITURL = process.env.INITURL
console.log('INITURL',INITURL)

dashboard_route.use(isAuth)
dashboard_route.get(`${INITURL}/getUserList`, getUserList)

module.exports = dashboard_route