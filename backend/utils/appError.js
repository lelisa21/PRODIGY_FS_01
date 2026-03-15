export default class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;

    Error.captureStackTrace(this, this.constructor);
  }
}



/* 
feature updation with
Prisma instead of Mongoose
Zod validation
JWT + refresh tokens
Rate limiting
RBAC auth
Docker ready */
