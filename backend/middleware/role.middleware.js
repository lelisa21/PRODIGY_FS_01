import AppError from "../utils/appError.js";

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new AppError("Not authorized", 401));
        }

        if (!roles.includes(req.user.role)) {
            return next(new AppError(
                `User role ${req.user.role} is not authorized to access this route`, 
                403
            ));
        }

        next();
    };
};
