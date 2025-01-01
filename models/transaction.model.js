const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true, ref:'admin' },
    merchandTransactionId: { type: String, required: true },
    transactionId: { type: String, required: true },
    amount: { type: Number, required: true },
    subscription: { type: Boolean, required: true,default:true },
},{
    timestamps:true
});

const TransactionModel = mongoose.model('transaction', schema);

module.exports=TransactionModel