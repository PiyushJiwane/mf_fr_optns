const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, ref:'admin' },
    userId: { type: String, required: true },
    sid: { type: String, required: true },
    token: { type: String, required: true },
    viewToken: { type: String, required: true },
    finalToken: { type: String, required: true },
    expiresAt: { type: Date }
},{
    timestamps:true
});

const TokenModel = mongoose.model('token', schema);

module.exports=TokenModel