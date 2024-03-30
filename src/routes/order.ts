import { Router } from "express";
import { errorHandler } from "../errorHandler";
import authMiddleware from "../middlewares/auth";
import {
    createOrder,
    getListOrder,
    getOrderByUser,
    getOrders,
} from "../controllers/order";
import adminMiddleware from "../middlewares/admin";

const orderRoutes = Router();

orderRoutes.post("/", [authMiddleware], errorHandler(createOrder));
orderRoutes.get("/", [adminMiddleware], errorHandler(getOrders));

orderRoutes.get(
    "/index",
    [authMiddleware, adminMiddleware],
    errorHandler(getListOrder)
);
orderRoutes.get(
    "/users/:id",
    [authMiddleware, adminMiddleware],
    errorHandler(getOrderByUser)
);

export default orderRoutes;
