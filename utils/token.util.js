const jwt = require("jsonwebtoken")

require("dotenv").config()

const JWT_SECRETE_KEY = process.env.JWT_SECRETE_KEY

const isAuth = (req, res, next) => {
    console.log('-----isAuth-----')
    const authHeader = req.headers['authorization']
    console.log(`isAuth : authHeader : `,authHeader);

    if (!authHeader) return res.sendStatus(401)

    const jwt_token = authHeader.split(" ")[1]
    console.log(`isAuth : jwt_token : `,jwt_token);

    const decoded = jwt.decode(jwt_token);
    console.log(`isAuth : decoded : `,decoded);

    jwt.verify(jwt_token, JWT_SECRETE_KEY, function (err, decoded) {
        if (err) {
            return res.status(403).json({msg:"Token is invalid or expired"}); // Token is invalid or expired
        }
        console.log(`isAuth : decoded : `,decoded);
        req._id = decoded._id
        console.log("before next()")
        next()
    });
}

module.exports = isAuth