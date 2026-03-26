import UserService from "../services/user.service.js";
import ActivityService from "../services/activity.service.js";
import UserStatsService from "../services/userStats.service.js";
import AppError from "../utils/appError.js";

export const updateProfile = async (req, res, next) => {
    try {
        const { username, email, bio, location, website } = req.body;
        const userId = req.user.id;

        const updateData = {
            username,
            email,
            profile: {
                bio,
                location,
                website
            }
        };

        const user = await UserService.updateUser(userId, updateData);

        await ActivityService.logActivity(
            userId,
            'update_profile',
            'User updated their profile'
        );

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

export const getUserStats = async (req, res, next) => {
    try {
        const userId = req.user.id;
        
        const activities = await ActivityService.getUserActivities(userId, 10);
        
        res.status(200).json({
            success: true,
            data: activities
        });
    } catch (error) {
        next(error);
    }
};

export const getAdminStats = async (req, res, next) => {
    try {
        const stats = await UserStatsService.getDashboardStats();
        const recentActivities = await UserStatsService.getRecentActivities(10);
        
        res.status(200).json({
            success: true,
            data: {
                ...stats,
                recentActivities
            }
        });
    } catch (error) {
        next(error);
    }
};
