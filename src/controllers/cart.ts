import { Request, Response } from "express";
import { addItemSchema } from "../schemas/cart";
import { prismaClient } from "..";
import { Product } from "@prisma/client";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";

export const addToCart = async (req: Request, res: Response) => {
    const validatedData = addItemSchema.parse(req.body);
    let product: Product;
    try {
        product = await prismaClient.product.findFirstOrThrow({
            where: {
                id: validatedData.productId,
            },
        });
    } catch (err: any) {
        throw new NotFoundException(
            "Product not found!",
            ErrorCodes.PRODUCT_NOT_FOUND,
            err
        );
    }
    const cart = await prismaClient.cart.create({
        data: {
            userId: req.user.id,
            productId: validatedData.productId,
            quantity: validatedData.quantity,
        },
    });
    res.json(cart);
};

export const removeFromCart = async (req: Request, res: Response) => {};

export const changeQuantity = async (req: Request, res: Response) => {};
