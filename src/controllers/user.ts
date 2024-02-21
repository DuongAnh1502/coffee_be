import { Request, Response } from "express";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";
import { prismaClient } from "..";

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await prismaClient.user.findFirstOrThrow({
            where: {
                id: req.params.id,
            },
        });
        res.json(user);
    } catch (err: any) {
        throw new NotFoundException(
            "User not found!",
            ErrorCodes.USER_NOT_FOUND,
            err
        );
    }
};

export const updateUser = async (req: Request, res: Response) => {};

export const updateAddress = async (req: Request, res: Response) => {};