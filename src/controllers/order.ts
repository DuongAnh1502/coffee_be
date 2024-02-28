import { Request, Response } from "express";
import { prismaClient } from "..";
// 1. to create a transaction
// 2. to list all the cart items and proceed if cart is not empty
// 3. calculate the total amount of the order
// 4. fetch the user's address
// 5. to define computed field for formatted address on address module
// 6. we will create a order and order product
// 7. create event
// 8. to empty the cart

export const createOrder = async (req: Request, res: Response) => {
    return await prismaClient.$transaction(async (tx) => {
        const cart = await tx.cart.findMany({
            where: {
                userId: req.user.id,
            },
            include: {
                product: true,
            },
        });
        if (cart.length === 0) {
            return res.json({ message: "Cart is empty" });
        }
        const price = cart.reduce((acc, item) => {
            return acc + item.quantity * +item.product.price;
        }, 0);
        const address = await tx.address.findFirst({
            where: {
                id: req.user.defaultShippingAddress!,
            },
        });
        const order = await tx.order.create({
            data: {
                userId: req.user.id,
                totalPrice: price,
                address: address?.formattedAddress!,
                status: "PENDING",
                products: {
                    create: cart.map((item) => {
                        return {
                            productId: item.id,
                            quantity: item.quantity,
                        };
                    }),
                },
            },
        });
        await tx.orderEvent.create({
            data: {
                orderId: order.id,
            },
        });
        await tx.cart.deleteMany({
            where: {
                userId: req.user.id,
            },
        });
        return res.json(order);
    });
};

export const getListOrder = async (req: Request, res: Response) => {
    let whereClause = {};
    const status = req.query.status;
    if (status) {
        whereClause = {
            status,
        };
    }
    const orders = await prismaClient.order.findMany({
        skip: +req.query.skip! || 0,
        take: 5,
        where: whereClause,
    });
    res.json(orders);
};
export const cancelOrder = async (req: Request, res: Response) => {};

export const getOrderByUser = async (req: Request, res: Response) => {
    const orders = await prismaClient.order.findMany({
        skip: +req.query.skip! || 0,
        take: 5,
        where: {
            userId: req.user.id,
        },
    });
    res.json(orders);
};
