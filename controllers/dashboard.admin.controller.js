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

const updateSubscription = async (req, res) => {
    try {
        await TransactionModel.updateMany({
            createdAt: {
                $lt: new Date(new Date().setDate(new Date().getDate() - 30)), // Last 30 days
            }
        },{ subscription: false })
        res.status(200).json({ success: true })
    } catch (err) {
        res.status(500).json({ success: false, error: err })
    }
}

module.exports = {
    getUserList,
    updateSubscription
}