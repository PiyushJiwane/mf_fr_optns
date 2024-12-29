const express = require("express");
const { makePayment, transactionDetails } = require("../controllers/payments.phonepay.controller");

require("dotenv").config()

const INITURL = process.env.INITURL

const payment_route = express.Router()

payment_route.get(`${INITURL}/makePayment`, makePayment)
payment_route.get(`${INITURL}/transactionDetails/:transactionId`, transactionDetails)

module.exports = payment_route