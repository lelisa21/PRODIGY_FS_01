import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username:{
       type:String,
       required:[true, "Username is required"],
       minLength:3 
    },
    email:{
       type:String,
       required:[true, "email is required"],
       unique:true

    },
    password:{
       type:String,
       required:[true, "password field is required"],
       minLength:6,
    }

}, {timestamps:true})


const User = mongoose.model("User" , userSchema)

export default User
