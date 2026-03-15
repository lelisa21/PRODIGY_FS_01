import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import AppError from "../utils/appError.js"

 export const protect = async (req, res, next) => {
    try {
    let token;
   if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    token = req.headers.authorization.split(" ")[1]
    if(!token) return next(new AppError("token not exist or expired" , 401))

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const user = await User.findById(decoded.id)
    if(!user)
        throw new AppError("user not found" , 404)
    req.user = user
    next()
  } catch (error) {
    return next(new AppError("Token invalid or expired", 401))
  }
}
