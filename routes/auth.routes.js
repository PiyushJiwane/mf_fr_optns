const express = require("express");
const { regenerateToken } = require("../controllers/token.controller");

require("dotenv").config();

const auth_route = express.Router()
const INITURL = process.env.INITURL

auth_route.get(`${INITURL}/regenerateToken`, regenerateToken)
