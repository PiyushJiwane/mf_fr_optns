const UserModel = require("../models/user.model")
const bcrypt = require("bcrypt");
const jwtFn = require("../config/jwtConfig");
const TokenModel = require("../models/token.model");
const RefreshTokenModel = require("../models/refreshToken.model");
const cookieOptions = require("../config/config");

require("dotenv").config()

const SALT_ROUND = Number(process.env.SALT_ROUND)
const JWT_SECRETE_KEY = process.env.JWT_SECRETE_KEY
const JWT_REFRESHTOKEN_SECRETE_KEY = process.env.JWT_REFRESHTOKEN_SECRETE_KEY

const login = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ msg: "Please provide username and password" })
    }

    const uName = username.toUpperCase()
    const user = await UserModel.findOne({ username: uName })
    if (!user) {
        return res.status(400).json({success:false, msg: "User not found" })
    }
    
    const encryptedPassword = await bcrypt.compare(password, user.password)
    if (encryptedPassword) {
        const jwt_token = await jwtFn(user._id, JWT_SECRETE_KEY)
        const jwt_refresh_token = await jwtFn(user._id, JWT_REFRESHTOKEN_SECRETE_KEY)

        await RefreshTokenModel.findByIdAndUpdate(user._id, {
            _id: user._id,
            refreshToken: jwt_refresh_token
        }, { upsert: true })

        res.cookie("refreshToken", jwt_refresh_token, cookieOptions(10))
        res.cookie("jwtToken", jwt_token, cookieOptions(1))

        return res.status(200).json({success:true, msg: "User logged in successfully" })
    }
    return res.status(400).json({success:false, msg: "Invalid password" })
}

const registration=async (req,res)=>{
    const { username, password } = req.body

    if(!username || !password){
        return res.status(400).json({msg:"Please provide username and password"})
    }

    const uName = username.toUpperCase()
    const bcryptPassword=await bcrypt.hash(password, SALT_ROUND)
    
    const userExists = await UserModel.findOne({ username:uName })
    if(userExists){
        return res.status(400).json({success:false ,msg:"User already exists"})
    }

    const user = await UserModel.create({ username:uName, password:bcryptPassword })
    if(user){
        return res.status(201).json({success:true ,msg:"User created successfully"})
    }
    return res.status(500).json({success:false,msg:"Internal server error"})
}

module.exports = {
    registration,
    login
}