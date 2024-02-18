import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../errorHandler";
import { addToCart, changeQuantity, removeFromCart } from "../controllers/cart";

const cartRoutes = Router();

cartRoutes.post("/", [authMiddleware], errorHandler(addToCart));
cartRoutes.put("/:id", [authMiddleware], errorHandler(changeQuantity));
cartRoutes.delete("/", [authMiddleware], errorHandler(removeFromCart));

export default cartRoutes;
