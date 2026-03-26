import express from "express";
import { 
    updateProfile, 
    getUserStats 
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.patch("/profile", updateProfile);
router.get("/stats", getUserStats);

export default router;
