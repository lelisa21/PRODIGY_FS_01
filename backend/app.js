import express from "express"
import authRoutes from "./routes/auth.routes.js"
import roleRoutes from "./routes/role.routes.js"

import rateLimit from "express-rate-limit"

import cors from "cors"
const app = express()

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173', credentials:true }))

app.use("/api/auth", authRoutes);
app.use("/api/admin", roleRoutes)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:"Too many requests, try again later"
})

app.use(limiter)

export default app
