import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/root";

export const errorMiddleware = (
    errors: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(errors.statusCode).json({
        message: errors.message,
        errorCode: errors.errorCode,
        error: errors.errors,
    });
};
