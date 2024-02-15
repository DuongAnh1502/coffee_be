import { Request, Response } from "express";
import { AddProductSchema, UpdateProductSchema } from "../schemas/products";
import { prismaClient } from "..";

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

export const deleteProduct = async (req: Request, res: Response) => {};

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

export const getProductById = async (req: Request, res: Response) => {};
