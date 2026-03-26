import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import AppError from "../utils/appError.js";
import activityService from "./activity.service.js";

class AuthService {
    constructor() {
        this.refreshTokens = new Map();
    }

    generateTokens(userId, role) {
        const accessToken = jwt.sign(
            { id: userId, role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' }
        );

        const refreshToken = jwt.sign(
            { id: userId },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' }
        );

        this.refreshTokens.set(refreshToken, {
            userId,
            role,
            expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return { accessToken, refreshToken };
    }

    async register(userData) {
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
            role: 'user',
            isActive: true
        });

        const tokens = this.generateTokens(user._id, user.role);
        
           await activityService.logActivity(
          user._id, 
          'register', 
          `User registered with email ${email}`
);
        const userObject = user.toObject();
        delete userObject.password;

        return {
            user: userObject,
            ...tokens
        };
    }

 
    // Login user
    async login(email, password) {
        try {
         console.log("1. Login attempt for:", email);
        const user = await User.findOne({ email }).select('+password');
         console.log("2. User found:", user ? "Yes" : "No");
        if (!user) {
            throw new AppError("Invalid credentials", 401);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new AppError("Invalid credentials", 401);
        }

        if (!user.isActive) {
            throw new AppError("Account is deactivated. Please contact support", 403);
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        const tokens = this.generateTokens(user._id, user.role);
        
        const userObject = user.toObject();
        delete userObject.password;
        await activityService.logActivity(
        user._id, 
        'login', 
         `User logged in from ${new Date().toLocaleString()}`
);
        return {
            user: userObject,
            ...tokens
        };
        } catch (error) {
            console.log("Login error details:", error.message);
           throw new AppError(error.message || "error on login" , 401)  
        }
    }

    // Refresh access token
    async refreshAccessToken(refreshToken) {
        const tokenData = this.refreshTokens.get(refreshToken);
        
        if (!tokenData) {
            throw new AppError("Invalid refresh token", 401);
        }

        if (tokenData.expiresAt < Date.now()) {
            this.refreshTokens.delete(refreshToken);
            throw new AppError("Refresh token expired", 401);
        }

        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            
            const user = await User.findById(decoded.id);
            
            if (!user || !user.isActive) {
                throw new AppError("User not found or inactive", 401);
            }

            const newTokens = this.generateTokens(user._id, user.role);
            
            this.refreshTokens.delete(refreshToken);

            return newTokens;
        } catch (error) {
            this.refreshTokens.delete(refreshToken);
            throw new AppError("Invalid refresh token", 401);
        }
    }

    // Logout
    async logout(refreshToken) {
        this.refreshTokens.delete(refreshToken);
        return { message: "Logged out successfully" };
    }
}

export default new AuthService();
