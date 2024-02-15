import { Request, Response } from "express";
import { AddAddressSchema, UpdateAddressSchema } from "../schemas/address";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";

export const addAddress = async (req: Request, res: Response) => {
    const validatedData = AddAddressSchema.parse(req.body);
    const address = await prismaClient.address.create({
        data: {
            ...validatedData,
            userId: req.user.id,
        },
    });
    res.json(address);
};

export const updateAddress = async (req: Request, res: Response) => {
    const validatedData = UpdateAddressSchema.parse(req.body);
    try {
        const updatedAddress = await prismaClient.address.update({
            where: {
                id: req.params.id,
                userId: req.user.id,
            },
            data: validatedData,
        });
        res.json(updatedAddress);
    } catch (err: any) {
        throw new NotFoundException(
            "Address not found!",
            ErrorCodes.ADDRESS_NOT_FOUND,
            err
        );
    }
};

export const deleteAddress = async (req: Request, res: Response) => {
    try {
        await prismaClient.address.delete({
            where: {
                id: req.params.id,
                userId: req.user.id,
            },
        });
    } catch (err: any) {
        throw new NotFoundException(
            "Address not found!",
            ErrorCodes.ADDRESS_NOT_FOUND,
            err
        );
    }
};
