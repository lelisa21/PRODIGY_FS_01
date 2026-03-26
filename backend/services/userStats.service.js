import User from "../models/user.model.js";
import Activity from "../models/activity.model.js";

class UserStatsService {
    async getDashboardStats() {
        const totalUsers = await User.countDocuments();
        
        const activeUsers = await User.countDocuments({ isActive: true });
        
        const adminCount = await User.countDocuments({ role: 'admin' });
        const userCount = await User.countDocuments({ role: 'user' });
        
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const newUsersLastMonth = await User.countDocuments({
            createdAt: { $gte: thirtyDaysAgo }
        });
        
        const totalUsersBefore = await User.countDocuments({
            createdAt: { $lt: thirtyDaysAgo }
        });
        const userGrowth = totalUsersBefore === 0 ? 0 : 
            Math.round((newUsersLastMonth / totalUsersBefore) * 100);

        return {
            totalUsers,
            activeUsers,
            userGrowth,
            roleDistribution: {
                admin: adminCount,
                user: userCount
            }
        };
    }

    async getRecentActivities(limit = 10) {
        const activities = await Activity.find()
            .populate('user', 'username email')
            .sort('-timestamp')
            .limit(limit);
        return activities;
    }
}

export default new UserStatsService();
