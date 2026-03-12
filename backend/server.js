import { configDotenv } from "dotenv";
import app from "./app.js";
import { ConnectDB } from "./config/db.js";
configDotenv()
const PORT =  process.env.PORT || 5000

ConnectDB()
app.listen(PORT, () => {
  console.log(`server is runnnig on port http://localhost:${PORT}`)
})
