import express from "express"
import router from "./routes/auth.routes.js"

import rateLimit from "express-rate-limit"

import cors from "cors"
const app = express()

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173', credentials:true }))

// routes
app.use("/api/auth", router)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:"Too many requests, try again later"
})

app.use(limiter)

export default app
