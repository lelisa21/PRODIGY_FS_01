import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    action: {
        type: String,
        enum: ['login', 'register', 'update_profile', 'role_change', 'delete_user'],
        required: true
    },
    details: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

activitySchema.index({ user: 1, timestamp: -1 });

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
