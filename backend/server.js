import { configDotenv } from "dotenv";
import app from "./app.js";
import { ConnectDB } from "./config/db.js";
configDotenv()
const PORT =  process.env.PORT || 5000
app.get("/" , (req, res) => {
    res.send("Hello from home page")
})

// global error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success:false,
    message: err.message || "Something went wrong"
  })
})

ConnectDB()
app.listen(PORT, () => {
  console.log(`server is runnnig on port http://localhost:${PORT}/`)
})
