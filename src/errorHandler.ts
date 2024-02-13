import { NextFunction, Request, Response } from "express";
import { ErrorCodes, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";
import { ZodError } from "zod";
import { UnprocessableEntity } from "./exceptions/validation";

export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next);
        } catch (err: any) {
            let exception: HttpException;
            if (err instanceof HttpException) {
                exception = err;
            } else if (err instanceof ZodError) {
                exception = new UnprocessableEntity(
                    "Validation fail!",
                    ErrorCodes.UNPROCESSABLE_ENTITY,
                    err
                );
            } else {
                exception = new InternalException(
                    "Internal exception",
                    ErrorCodes.INTERNAL_EXCEPTION,
                    err
                );
            }
            next(exception);
        }
    };
};
