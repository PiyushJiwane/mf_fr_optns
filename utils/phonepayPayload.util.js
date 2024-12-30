const { v4: uuidv4 } = require('uuid');
const sha256 = require('sha256');

require("dotenv").config()

const PHONEPAY_SALT_KEY = process.env.PHONEPAY_SALT_KEY
const PHONEPAY_SALT_INDEX = Number(process.env.PHONEPAY_SALT_INDEX)
const PHONEPAY_MERCHANT_ID = process.env.PHONEPAY_MERCHANT_ID
const DEV_URL = process.env.DEV_URL
const sub_url = "payment/mf_fr_optns/api/v1/transactionDetails/"

const payload = (userId, amountInPaisa, mobileNumber) => {
    const uuid = uuidv4()
    const merchantTransactionId = uuid.replace(/-/g, '')
    // console.log(merchantTransactionId)
    // MT7850590068188104
    // Original JSON payload
    const payload = {
        merchantId: PHONEPAY_MERCHANT_ID,
        merchantTransactionId: merchantTransactionId,
        merchantUserId: userId,
        amount: amountInPaisa,
        redirectUrl: `${DEV_URL}${sub_url}${merchantTransactionId}`,
        redirectMode: "REDIRECT",
        mobileNumber: mobileNumber,
        paymentInstrument: {
            type: "PAY_PAGE"
        }
    };

    // Convert JSON to string
    const payloadStr = JSON.stringify(payload);
    // Encode to UTF-8 and then Base64
    const bufferObj = Buffer.from(payloadStr, 'utf8')
    const base64EncodedPayload = bufferObj.toString('base64')

    const xVerify = sha256(base64EncodedPayload + "/pg/v1/pay" + PHONEPAY_SALT_KEY) + "###" + PHONEPAY_SALT_INDEX;

    return {
        xVerify,
        base64EncodedPayload
    }

}

module.exports = { payload }