import mongoose from "mongoose"
import {configDotenv} from "dotenv"
configDotenv()


export const ConnectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Database connected")
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
