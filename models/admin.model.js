const { default: mongoose } = require("mongoose");

const schema=new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        default:"admin"
    },
    password:{
        type:String,
        trim:true,
        required: [true, "please provide the password"],
        default:"Admin@123$",
        minlength:[8, "poassword must be in length of greater than 8 character."]
    }
},{
    timestamps:true
})


const AdminModel = mongoose.model("admin", schema)

module.exports = AdminModel