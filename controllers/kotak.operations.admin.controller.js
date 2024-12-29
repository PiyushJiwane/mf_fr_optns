const { header } = require("express-validator")
const { SCRIPT_MASTER_KOTAK_URL, POSITION_BOOK_KOTAK_URL, PORTFOLOIO_HOLDINGS_KOTAK_URL } = require("../constants/KotakUrl")
const { default: axios } = require("axios")
const Papa = require('papaparse');
const loggerUtil = require("../utils/logger.util");

const promiseData = (csvData) => {
    return new Promise((resolve, reject) => {
        Papa.parse(csvData, {
            header: true, // Treat the first row as headers
            complete: (results) => {
                resolve(results.data); // Resolve the Promise with parsed data
            },
            error: (error) => {
                reject(error.message); // Reject the Promise on error
            },
        });
    });
}

const getCsvData = async (fileURL) => {
    try {
        const response = await axios.get(fileURL); // Fetch CSV as plain text
        const csvData = response.data;

        const data = await promiseData(csvData); // Await the parsed data
        return { data, success: true };
    } catch (error) {
        console.error('Error fetching or processing the CSV:', error.message);
    }
}

const getScript = async (req, res) => {
    const accessToken = req.accessToken
    const scriptData = await axios.get(SCRIPT_MASTER_KOTAK_URL, {
        headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${accessToken}`
        }
    })
    const files=scriptData.data.data.filesPaths
    for (const file of files) {
        if (file.includes("nse_cm")) {
            const data = await getCsvData(file)
            loggerUtil("info", data, "getCsvData")
            if (data.success) {
                loggerUtil("info", "CSV parsed successfully", "getCsvData")
                return res.status(200).json({ data: data.data });
            }
            loggerUtil("error", data.error, "getCsvData")
            return res.status(500).json({ msg: "Error parsing CSV", error: true });
        }
    }
}

const getPositionBook = async (req, res) => { 
    const { sid, accessToken, token } = req
    try {
        const position = await axios.get(POSITION_BOOK_KOTAK_URL, {
            headers: {
                'accept': 'application/json',
                'Sid': sid,
                'Auth': token,
                'neo-fin-key':'neotradeapi',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        if (position.data.stat === "Not_Ok") {
            loggerUtil("error", "getPositionBook", position.data)
            return res.status(500).json({ msg: position.data })
        }
        const positionBook = position.data.data
        const positionBookArr = []
        positionBook.forEach((element) => {
            positionBookArr.push({
                trdSym: element.trdSym,
                buyAmt: element.buyAmt,
                sellAmt: element.sellAmt,
            })
        })

        loggerUtil("info", "positionBook", "getPositionBook")
        res.status(200).json({
            data:positionBookArr
        })
    } catch (error) {
        loggerUtil("error", "getPositionBook", error.response?.data || error.message)
        return res.status(500).json({ msg: error.response?.data || error.message })
    }
}

const getPortfolioHoldings = async (req, res) => {
    const { sid, accessToken, token } = req
    try {
        const portfolio = await axios.get(PORTFOLOIO_HOLDINGS_KOTAK_URL, {
            headers: {
                'accept': '*/*',
                'Sid': sid,
                'Auth': token,
                'neo-fin-key':'neotradeapi',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        loggerUtil("info", "portfolio", "getPortfolioHoldings")
        res.status(200).json({
            data:portfolio.data.data
        })
    } catch (error) {
        loggerUtil("error", "getPositionBook", error.response?.data || error.message)
        return res.status(500).json({ msg: error.response?.data || error.message })
    }
 }


module.exports = { getScript, getPositionBook,getPortfolioHoldings }