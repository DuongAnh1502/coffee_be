import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../errorHandler";
import {
    addToCart,
    changeQuantity,
    listCarts,
    removeFromCart,
} from "../controllers/cart";

const cartRoutes = Router();

cartRoutes.post("/", [authMiddleware], errorHandler(addToCart));
cartRoutes.put("/:id", [authMiddleware], errorHandler(changeQuantity));
cartRoutes.delete("/:id", [authMiddleware], errorHandler(removeFromCart));
cartRoutes.get("/", [authMiddleware], errorHandler(listCarts));

export default cartRoutes;
