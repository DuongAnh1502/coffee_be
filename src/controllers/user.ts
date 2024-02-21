import { Request, Response } from "express";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";
import { prismaClient } from "..";
import { UpdateUserSchema } from "../schemas/users";
import { BadRequestException } from "../exceptions/bard-request";

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

export const updateUser = async (req: Request, res: Response) => {
    const validatedData = UpdateUserSchema.parse(req.body);
    const user = await prismaClient.user.findFirst({
        where: {
            id: req.params.id,
        },
    });
    if (user) {
        const updatedUser = await prismaClient.user.update({
            where: {
                id: user.id,
            },
            data: validatedData,
        });
        res.json(updatedUser);
    } else {
        throw new NotFoundException(
            "User not found!",
            ErrorCodes.USER_NOT_FOUND
        );
    }
};

export const updateAddress = async (req: Request, res: Response) => {};
