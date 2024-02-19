import { Request, Response } from "express";
import { QuantitySchema, AddItemSchema } from "../schemas/cart";
import { prismaClient } from "..";
import { Cart, Product } from "@prisma/client";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";

export const addToCart = async (req: Request, res: Response) => {
    const validatedData = AddItemSchema.parse(req.body);
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

export const removeFromCart = async (req: Request, res: Response) => {
    try {
        await prismaClient.cart.delete({
            where: {
                id: req.params.id,
                userId: req.user.id,
            },
        });
        res.json({ message: "Success" });
    } catch (err: any) {
        throw new NotFoundException(
            "Product not found!",
            ErrorCodes.PRODUCT_NOT_FOUND,
            err
        );
    }
};

export const changeQuantity = async (req: Request, res: Response) => {
    const validatedData = QuantitySchema.parse(req.body);
    try {
        const changedProduct = await prismaClient.cart.update({
            where: {
                id: req.params.id,
                userId: req.user.id,
            },
            data: {
                quantity: validatedData.quantity,
            },
        });
        res.json(changeQuantity);
    } catch (err: any) {
        throw new NotFoundException(
            "Product not found!",
            ErrorCodes.PRODUCT_NOT_FOUND,
            err
        );
    }
};

export const listCarts = async (req: Request, res: Response) => {
    const listCart = await prismaClient.cart.findMany({
        where: {
            userId: req.user.id,
        },
    });
    res.json(listCart);
};
