import { Request, Response } from "express";
import { addItemSchema } from "../schemas/cart";
import { prismaClient } from "..";

export const addToCart = async (req: Request, res: Response) => {
    const validatedData = addItemSchema.parse(req.body);
    const product = await prismaClient.cart.create({
        data: {
            userId: req.user.id,
            productId: validatedData.productId,
            quantity: validatedData.quantity,
        },
    });
    res.json(product);
};

export const removeFromCart = async (req: Request, res: Response) => {};

export const changeQuantity = async (req: Request, res: Response) => {};
