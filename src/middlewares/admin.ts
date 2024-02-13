import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";

const adminMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.user.role === "USER") {
        next(
            new UnauthorizedException("Unauthorized!", ErrorCodes.UNAUTHORIZED)
        );
    }
    next();
};

export default adminMiddleware;
