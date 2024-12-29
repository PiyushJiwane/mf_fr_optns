const axios = require('axios');
const { payload } = require('../utils/phonepayPayload.util');
const sha256 = require('sha256');

require("dotenv").config()

const PHONEPAY_MERCHANT_ID = process.env.PHONEPAY_MERCHANT_ID
const PHONEPAY_SALT_INDEX = Number(process.env.PHONEPAY_SALT_INDEX)
const PHONEPAY_SALT_KEY = process.env.PHONEPAY_SALT_KEY

const makePayment = async (req, res) => {
    // const { userId, amountInPaisa, mobileNumber } = req.body
    const userId = "MUID123"
    const amountInPaisa = 10000
    const mobileNumber = "9999999999"
    const { xVerify, base64EncodedPayload } = payload(userId, amountInPaisa, mobileNumber)
    const options = {
        method: 'post',
        url: 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            "X-VERIFY": xVerify,
        },
        data: {
            request: base64EncodedPayload
        }
    };
    axios
        .request(options)
        .then(function (response) {
            res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
            // res.send(response.data)
        })
        .catch(function (error) {
            console.error(error);
        })
}

const transactionDetails = async (req, res) => {
    const { transactionId } = req.params
    console.log(`transactionId : `, transactionId);
    const xVerify=sha256(`/pg/v1/status/${PHONEPAY_MERCHANT_ID}/${transactionId}` + PHONEPAY_SALT_KEY) + `###` + PHONEPAY_SALT_INDEX

    const options = {
        method: 'get',
        url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${PHONEPAY_MERCHANT_ID}/${transactionId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': xVerify,
            'X-MERCHANT-ID': PHONEPAY_MERCHANT_ID
        },

    };
    axios
        .request(options)
        .then(function (response) {
            res.send(response.data)
        })
        .catch(function (error) {
            console.error(error);
        });
}

module.exports = { makePayment, transactionDetails }