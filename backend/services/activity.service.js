import Activity from "../models/activity.model.js";

class ActivityService {
    async logActivity(userId, action, details) {
        try {
            const activity = await Activity.create({
                user: userId,
                action,
                details,
                timestamp: new Date()
            });
            return activity;
        } catch (error) {
            console.error('Error logging activity:', error);
        }
    }

    async getUserActivities(userId, limit = 10) {
        const activities = await Activity.find({ user: userId })
            .populate('user', 'username email')
            .sort('-timestamp')
            .limit(limit);
        return activities;
    }

    async getAllActivities(limit = 50) {
        const activities = await Activity.find()
            .populate('user', 'username email')
            .sort('-timestamp')
            .limit(limit);
        return activities;
    }
}

export default new ActivityService();
