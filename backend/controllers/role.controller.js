import UserService from "../services/user.service.js";
import AuthService from "../services/auth.service.js";
import AppError from "../utils/appError.js";
import userStatsService from "../services/userStats.service.js";

// Get all users (admin only)
export const getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const role = req.query.role;
    const search = req.query.search;

    const filter = {};
    if (role && ["user", "admin"].includes(role)) {
      filter.role = role;
    }
    if (search) {
      filter.$or = [
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const result = await UserService.getAllUsers(page, limit, filter);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

// Get user by ID (admin only)
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Delete user (admin only)
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id === req.user.id) {
      throw new AppError("Cannot delete your own account", 400);
    }

    const result = await UserService.deleteUser(id);
    await ActivityService.logActivity(
      req.user.id,
      "delete_user",
      `User ${id} was deleted by ${req.user.username}`,
    );
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

// Change user role (admin only)
export const changeUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role || !["user", "admin"].includes(role)) {
      throw new AppError("Please provide a valid role (user or admin)", 400);
    }

    if (id === req.user.id) {
      throw new AppError("Cannot change your own role", 400);
    }

    const user = await UserService.changeUserRole(id, role);
    await ActivityService.logActivity(
      id,
      "role_change",
      `User role changed to ${role} by ${req.user.username}`,
    );
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Get dashboard stats (admin only)
export const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await userStatsService.getDashboardStats();
    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};
