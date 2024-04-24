import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../errorHandler";
import {
    addAddress,
    deleteAddress,
    updateAddress,
} from "../controllers/address";
const a = 3;

const addressRoutes = Router();

addressRoutes.post("/", [authMiddleware], errorHandler(addAddress));
addressRoutes.put("/:id", [authMiddleware], errorHandler(updateAddress));
addressRoutes.delete("/:id", [authMiddleware], errorHandler(deleteAddress));

export default addressRoutes;
