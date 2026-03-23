import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 6,
        select: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date
    },
    profile: {
        avatar: String,
        bio: String,
        location: String,
        website: String
    }
}, {
    timestamps: true
});

// Index for better query performance
userSchema.index({ role: 1 });

const User = mongoose.model("User", userSchema);

export default User;
