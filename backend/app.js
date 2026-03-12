import express from "express"
import router from "./routes/auth.routes.js"
const app = express()

app.use(express.json())
app.use((err, req,res, next) => {
    res.status(err.statusCode || 500).json({
    success:false,
    message: err.message || "Something went wrong"
  })
})

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// routes

app.use("/api/auth" ,router)

export default app
