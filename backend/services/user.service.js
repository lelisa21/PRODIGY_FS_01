import User from "../models/user.model.js";
import AppError from "../utils/appError.js";

class UserService {
    // Get user by ID
    async getUserById(id) {
        const user = await User.findById(id);
        if (!user) {
            throw new AppError("User not found", 404);
        }
        return user;
    }


    async getAllUsers(page = 1, limit = 10, filter = {}) {
        const skip = (page - 1) * limit;
        
        const users = await User.find(filter)
            .select('-password')
            .skip(skip)
            .limit(limit)
            .sort('-createdAt');

        const total = await User.countDocuments(filter);

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

    // Update user
    async updateUser(id, updateData) {
        const allowedUpdates = ['username', 'profile', 'isActive'];
        const filteredUpdates = {};
        
        Object.keys(updateData).forEach(key => {
            if (allowedUpdates.includes(key)) {
                filteredUpdates[key] = updateData[key];
            }
        });

        const user = await User.findByIdAndUpdate(
            id,
            filteredUpdates,
            { new: true, runValidators: true }
        ).select('-password');
        
        if (!user) {
            throw new AppError("User not found", 404);
        }
        
        return user;
    }


    async deleteUser(id) {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            throw new AppError("User not found", 404);
        }
        return { message: "User deleted successfully" };
    }

    async changeUserRole(id, newRole) {
        if (!['user', 'admin'].includes(newRole)) {
            throw new AppError("Invalid role", 400);
        }

        const user = await User.findByIdAndUpdate(
            id,
            { role: newRole },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            throw new AppError("User not found", 404);
        }

        return user;
    }
}

export default new UserService();
