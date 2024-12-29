const ACCESSTOKEN_KOTAK_URL = "https://napi.kotaksecurities.com/oauth2/token"
const FINALTOKEN_KOTAK_URL = "https://gw-napi.kotaksecurities.com/login/1.0/login/v2/validate"
const OTP_KOTAK_URL = "https://gw-napi.kotaksecurities.com/login/1.0/login/otp/generate"
const SCRIPT_MASTER_KOTAK_URL = "https://gw-napi.kotaksecurities.com/Files/1.0/masterscrip/v1/file-paths"
const POSITION_BOOK_KOTAK_URL = "https://gw-napi.kotaksecurities.com/Orders/2.0/quick/user/positions?sId=server1"
const PORTFOLOIO_HOLDINGS_KOTAK_URL = "https://gw-napi.kotaksecurities.com/Portfolio/1.0/portfolio/v1/holdings?alt=false"

module.exports = {
    ACCESSTOKEN_KOTAK_URL,
    FINALTOKEN_KOTAK_URL,
    OTP_KOTAK_URL,
    SCRIPT_MASTER_KOTAK_URL,
    POSITION_BOOK_KOTAK_URL,
    PORTFOLOIO_HOLDINGS_KOTAK_URL
}