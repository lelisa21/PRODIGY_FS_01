import express from "express";
import { 
    getAllUsers, 
    getUserById,
    deleteUser, 
    changeUserRole,
    getDashboardStats 
} from "../controllers/role.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

// All admin routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id/role", changeUserRole);
router.get("/stats", getDashboardStats);

export default router;
