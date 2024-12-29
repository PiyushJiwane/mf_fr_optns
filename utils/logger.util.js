const logger = require("../config/logConfig")

const loggerUtil = (method,msg,fn) => {
    if (method === "info") {
        logger.info({
            message: {
                fn,
                msg
            }
        })
    }
    if (method === "error") {
        logger.error({
            message: {
                fn,
                msg
            }
        })
    }
}

module.exports = loggerUtil