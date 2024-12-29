const { validationResult } = require('express-validator');
const { password_validBody, username_validBody } = require('./commonValidators');

const userRegistrationValidator = [
    username_validBody,
    password_validBody,

    // After validation, check for errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // If no errors, proceed to the next middleware (controller)
    }
]

module.exports=userRegistrationValidator