import AuthService from "../services/auth.service.js";
import AppError from "../utils/appError.js";

// Register
export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            throw new AppError("Please enter all fields", 400);
        }

        const result = await AuthService.register({ username, email, password });

        // Set refresh token in HTTP-only cookie
        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        res.status(201).json({
            success: true,
            accessToken: result.accessToken,
            data: result.user
        });
    } catch (error) {
        next(error);
    }
};

// Login
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new AppError("Please enter all fields", 400);
        }

        const result = await AuthService.login(email, password);

        // Set refresh token in HTTP-only cookie
        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            accessToken: result.accessToken,
            data: result.user
        });
    } catch (error) {
        next(error);
    }
};

// Logout
export const logout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        
        if (refreshToken) {
            await AuthService.logout(refreshToken);
        }

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        next(error);
    }
};

// Protected dashboard
export const getDashboard = async (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).json({
            success: true,
            message: `Welcome ${user.username}`,
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        next(error);
    }
};

export const getCurrentUser = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            data: req.user
        });
    } catch (error) {
        next(error);
    }
};
