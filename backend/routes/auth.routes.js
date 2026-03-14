import {Router} from "express"
import { getDashboard, login, logout, register } from "../controllers/auth.controller.js"
import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

const router = Router()
router.post("/register" , register);
router.post("/login" , login)
router.post("/logout", logout)
// protected routers it's going to be dashboard
router.get("/me", protect, (req, res) => {
  res.json(req.user)
})
router.get("/admin" , protect , authorize("admin"), (req, res) => {
    res.json({
        message:"Welcome Admin"
    })
})
router.get("/dashboard" , protect, getDashboard)

export default router
