const express = require("express");
const userRegistrationValidator = require("../validators/user.registration.validator");
const { registration, login } = require("../controllers/auth.user.controller");

require("dotenv").config()

const user_route = express.Router()

user_route.post(`/registration`, userRegistrationValidator,registration)
user_route.post(`/login`, userRegistrationValidator,login)

module.exports = user_route