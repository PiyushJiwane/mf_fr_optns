const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true,ref:'user' },
    refreshToken: {
        type: String,
        trim: true,
        required: [true, "please provide the refresh token"],
        unique: true,
        trim: true,       
    }
}, {
    timestamps: true
})

const RefreshTokenModel = mongoose.model("refreshToken", schema)

module.exports = RefreshTokenModel