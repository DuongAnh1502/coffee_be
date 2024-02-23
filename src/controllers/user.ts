import { Request, Response } from "express";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";
import { prismaClient } from "..";
import { UpdateUserSchema } from "../schemas/users";

export const getListUser = async (req: Request, res: Response) => {
    const users = await prismaClient.user.findMany({
        skip: +req.query.skip! || 0,
        take: 5,
    });
    res.json(users);
};
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
        if (validatedData.defaultShippingAddress) {
            try {
                const address = await prismaClient.address.findFirstOrThrow({
                    where: {
                        id: validatedData.defaultShippingAddress,
                    },
                });
            } catch (err: any) {
                throw new NotFoundException(
                    "Address not found!",
                    ErrorCodes.ADDRESS_NOT_FOUND,
                    err
                );
            }
        }
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
