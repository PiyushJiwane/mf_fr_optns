const express = require("express");
const { makePayment, transactionDetails } = require("../controllers/payments.phonepay.controller");

require("dotenv").config()

const payment_route = express.Router()

payment_route.get(`/makePayment`, makePayment)
payment_route.get(`/transactionDetails/:transactionId`, transactionDetails)

module.exports = payment_route