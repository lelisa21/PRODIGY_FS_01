import User from "../models/user.model.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcrypt";

class UserService {
  // Create new user
  async createUser(userData) {
    const { username, email, password } = userData;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'user' // default role
    });

    return this.sanitizeUser(user);
  }

  // Find user by email
  async findByEmail(email) {
    return await User.findOne({ email });
  }

  // Find user by ID
  async findById(id) {
    return await User.findById(id);
  }

  // Update user
  async updateUser(id, updateData) {
    // Remove sensitive fields
    delete updateData.password;
    delete updateData.role;
    
    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    return this.sanitizeUser(user);
  }

  // Get all users (admin only)
  async getAllUsers(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const users = await User.find()
      .select('-password')
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');

    const total = await User.countDocuments();

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Delete user (admin only)
  async deleteUser(id) {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return { message: "User deleted successfully" };
  }

  // Change user role (admin only)
  async changeUserRole(id, newRole) {
    if (!['user', 'admin'].includes(newRole)) {
      throw new AppError("Invalid role", 400);
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role: newRole },
      { new: true }
    ).select('-password');

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }

  // Sanitize user (remove sensitive data)
  sanitizeUser(user) {
    const sanitized = user.toObject();
    delete sanitized.password;
    delete sanitized.__v;
    return sanitized;
  }

  // Update password
  async updatePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new AppError("Current password is incorrect", 401);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return { message: "Password updated successfully" };
  }
}

export default new UserService();
