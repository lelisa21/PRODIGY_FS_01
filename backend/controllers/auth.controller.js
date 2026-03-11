import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const generateToken = (id) => {
    return jwt.sign({id} , process.env.SECRET_KEY , {expiresIn: "14d"})
}


export const register = async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        throw new Error("Please Enter all fields")
    }

    const user = await User.findOne({email})
    if(user){
        throw new Error("User already Exist")
    }
  
    const hashedPassword = await bcrypt.hash(password, 10)

    const createUser = await User.create({
        username,
        email,
        password:hashedPassword
    })
    const token = generateToken(createUser._id)
    res.status(201).json({
        success:true,  
        token,
        data:{
            id:createUser._id,
            username:createUser.username,
            email:createUser.email,
          
        }
    })
}
