import { Request, Response } from "express";
import { AddProductSchema, UpdateProductSchema } from "../schemas/products";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";

export const addProduct = async (req: Request, res: Response) => {
    const validatedData = AddProductSchema.parse(req.body);
    const product = await prismaClient.product.create({
        data: {
            ...validatedData,
            tags: validatedData.tags.join(","),
        },
    });
    res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        await prismaClient.product.delete({
            where: {
                id: req.params.id,
            },
        });
        res.json({ message: "Product deleted!" });
    } catch (err: any) {
        throw new NotFoundException(
            "Product not found!",
            ErrorCodes.PRODUCT_NOT_FOUND,
            err
        );
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const validatedData = UpdateProductSchema.parse(req.body);
    const updatedProduct = await prismaClient.product.update({
        where: {
            id: req.params.id,
        },
        data: {
            ...validatedData,
            tags: validatedData.tags?.join(","),
        },
    });
    res.json(updatedProduct);
};

export const listProducts = async (req: Request, res: Response) => {
    const products = await prismaClient.product.findMany({
        skip: +req.query.skip! || 0,
        take: 5,
    });
    res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await prismaClient.product.findFirstOrThrow({
            where: {
                id: req.params.id,
            },
        });
        res.json(product);
    } catch (err: any) {
        throw new NotFoundException(
            "Product not found!",
            ErrorCodes.PRODUCT_NOT_FOUND,
            err
        );
    }
};
