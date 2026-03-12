import {Router} from "express"
import { getDashboard, login, register } from "../controllers/auth.controller.js"
import protect from "../middleware/auth.middleware.js";

const router = Router()
router.post("/register" , register);
router.post("/login" , login)
// protected routers it's going to be dashboard
router.get("/dashboard" , protect, getDashboard)

export default router
