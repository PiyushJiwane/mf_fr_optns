const { getUserListPipeline } = require("../aggregations/dashboard.admin.aggregation")
const TransactionModel = require("../models/transaction.model")


const getUserList = async (req, res) => {
    const userList = await getUserListPipeline()
    if (userList.success) {
        res.status(200).json({ userList: userList.data })
    } else {
        res.status(500).json({ error: userList.error })
    }
}

module.exports = {
    getUserList
}