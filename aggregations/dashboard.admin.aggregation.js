const mongoose = require('mongoose');

const transactionCollection = mongoose.connection.collection('transactions');

const getUserListPipeline = async () => {
    try {
        const results = await transactionCollection.aggregate([
            {
                // Filter transactions with createdAt within the last 30 days
                $match: {
                    createdAt: {
                        $gte: new Date(new Date().setDate(new Date().getDate() - 30)), // Last 30 days
                    },
                    subscription: true,
                },
            },
            {
                // Perform the lookup to join with the user collection
                $lookup: {
                    from: "users", // Name of the user collection
                    localField: "userId",
                    foreignField: "_id",
                    as: "userDetails",
                },
            },
            {
                // Optional: Flatten the userDetails array
                $unwind: "$userDetails",
            },
            {
                // Optional: Project the fields you want in the result
                $project: {
                    _id: 1,
                    transactionId: 1,
                    amount: 1,
                    "userDetails.username": 1,
                    "userDetails.createdAt": 1,
                },
            },
        ]).toArray();

        return {success: true, data: results};
    } catch (err) {
        return {success: false, error: err};
    }
}

module.exports = {
    getUserListPipeline
}