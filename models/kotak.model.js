const { default: mongoose } = require("mongoose");

require("dotenv").config()

const SALT_ROUND = process.env.SALT_ROUND

const schema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true },
    mobileNumber: {
        type: String,
        trim: true,
        required: [true, "please provide the mobile number"],
        unique: true,
        trim: true,
        validate: {
            validator: function (value) {
                // Validate against E.164 format (e.g., +919876543210)
                const e164Regex = /^\+?[1-9]\d{1,14}$/;
                return e164Regex.test(value);
            },
            message: 'Invalid mobile number format. Use E.164 format (e.g., +919876543210).',
        },
    },
    password: {
        type: String,
        trim: true,
        required: [true, "please provide the password"],
        minlength: [8, "poassword must be in length of greater than 8 character."],
        maxlength: [64, 'Password must not exceed 64 characters'],
        validate: {
            validator: function (value) {
                // Strong password regex: At least 1 uppercase, 1 lowercase, 1 number, and 1 special character
                const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                return strongPasswordRegex.test(value);
            },
            message:
                'Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
        },
    },
    consumerKey: {
        type: String,
        trim: true,
        required: [true, "please provide the consumerKey"],
    },
    consumerSecreteKey: {
        type: String,
        trim: true,
        required: [true, "please provide the consumerSecreteKey"],
    },
    otp: {
        type: String,
        trim: true,
        required: [true, "please provide the otp"],
        minlength: [6, 'OTP must be 6 characters long'],
        maxlength: [6, 'OTP must be 6 characters long'],
        validate: {
            validator: function (value) {
                // Ensure OTP is numeric
                const numericRegex = /^\d{6}$/;
                return numericRegex.test(value);
            },
            message: 'OTP must be a 6-digit numeric value',
        },
    }
}, {
    timestamps: true
})

// Hash password before saving
schema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, SALT_ROUND); // Hash with a salt round of 10
    }
    next();
});

const AdminModel = mongoose.model("admin", schema)

module.exports = AdminModel