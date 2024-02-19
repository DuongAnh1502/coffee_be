import { Request, Response } from "express";
import { addItemSchema } from "../schemas/cart";
import { prismaClient } from "..";
import { Cart, Product } from "@prisma/client";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";

export const addToCart = async (req: Request, res: Response) => {
    const validatedData = addItemSchema.parse(req.body);
    let product: Product;
    let cart: Cart;
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
    const oldCart = await prismaClient.cart.findFirst({
        where: {
            productId: validatedData.productId,
            userId: req.user.id,
        },
    });
    if (oldCart) {
        cart = await prismaClient.cart.update({
            where: {
                id: oldCart.id,
            },
            data: {
                quantity: oldCart.quantity + validatedData.quantity,
            },
        });
    } else {
        cart = await prismaClient.cart.create({
            data: {
                userId: req.user.id,
                productId: product.id,
                quantity: validatedData.quantity,
            },
        });
    }
    res.json(cart);
};

export const removeFromCart = async (req: Request, res: Response) => {};

export const changeQuantity = async (req: Request, res: Response) => {};
