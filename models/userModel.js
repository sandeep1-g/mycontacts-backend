const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [ true, "please add the user name"]
    },
    email : {
        type : String,
        required : [true, "please add the email"],
        unique : [true, "Emailhas already been used"],
    },
    password : {
        type : String,
        required : [true, "please add the email"],
    }
},{
    timestamps : true,
});
module.exports = mongoose.model("User",userSchema);