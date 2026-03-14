import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import AppError from "../utils/appError.js"

// to generate token
const generateToken = (id) => {
    return jwt.sign({id} , process.env.SECRET_KEY, {expiresIn: "14d"})
}

// register controller
export const register = async (req, res,next) => {
    try {
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        throw new AppError("Please Enter all fields", 400)
    }
  
    const user = await User.findOne({email})
    if(user){
        throw new AppError("User already Exist" , 400)
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
    } catch (error) {
        next(error)
      }
}

// login controller
export const login = async (req, res,next) => {
    try {
    const { email, password} = req.body;
    if(!email || !password) {
        throw new AppError("Please Enter all fields", 400) 
    }

    const user = await User.findOne({email})
    if(!user){
        throw new AppError("User not Exist", 404)
    }
   const isMatch  = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new AppError("invalid Credential" , 401)  
    }
    const token = generateToken(user._id)
    res.status(200).json({
        success:true,  
        token,
        data:{
            id:user._id,
            username:user.username,
            email:user.email,
        }
    })

    } catch (error) {
       next(error)
    }
}

// logout

export const logout = async (req, res) => {
  res.status(200).json({
    success:true,
    message:"Logged out successfully"
  })
}

// protected dashboard
export const getDashboard = async (req, res,next) => {
try{
  const  user = req.user
 res.status(200).json({
    success:true,
    message:`Welcome ${user.username}`,
    data:{
       username:user.username,
       email:user.email
    } 
 })

}catch(error){
  next(error)
 }
}
