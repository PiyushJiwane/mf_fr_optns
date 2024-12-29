const { check, body, validationResult, query, param } = require('express-validator');

const username_validBody = body('username').trim().isLength({ min: 1 }).withMessage('Name must be specified')

const email_validBody = body('email').isEmail().normalizeEmail().withMessage('Invalid email')

const email_validQuery = query('email').isEmail().normalizeEmail().withMessage('Invalid email')

const objectId_validParam=param("userId").isMongoId().withMessage(`Invalid userId`)

const password_validBody = body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character')

const otp_validBody = body('otp').isLength({ min: 4, max: 4 })
    .withMessage('OTP must be exactly 4 digits')
    .isNumeric()
    .withMessage('OTP must be numeric')

module.exports={
    username_validBody,
    email_validBody,
    password_validBody,
    otp_validBody,
    email_validQuery,
    objectId_validParam
}