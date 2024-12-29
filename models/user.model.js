const { default: mongoose } = require("mongoose");

const schema=new mongoose.Schema({
    username:{
        type:String,
        trim:true,
    },
    password:{
        type:String,
        trim:true,
        required: [true, "please provide the password"],
        minlength:[8, "poassword must be in length of greater than 8 character."]
    }
},{
    timestamps:true
})


const UserModel = mongoose.model("user", schema)

module.exports = UserModel