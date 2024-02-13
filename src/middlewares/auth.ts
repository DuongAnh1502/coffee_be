import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";
import { JWT_SECRET } from "../secret";
import { prismaClient } from "..";
import { User } from "@prisma/client";

const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let user: User;
    const token = req.headers.authorization;
    if (!token) {
        next(
            new UnauthorizedException("Unauthorized!", ErrorCodes.UNAUTHORIZED)
        );
    }
    try {
        const payload: { userId: string } = jwt.verify(
            token!,
            JWT_SECRET
        ) as any;
        user = await prismaClient.user.findFirstOrThrow({
            where: {
                id: payload.userId,
            },
        });
        const { password, ...currUser } = user!;
        req.user = currUser;
        next();
    } catch (err: any) {
        next(
            new UnauthorizedException(
                "Unauthorized!",
                ErrorCodes.UNAUTHORIZED,
                err
            )
        );
    }
};
export default authMiddleware;
