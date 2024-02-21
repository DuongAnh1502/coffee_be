import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { errorHandler } from "../errorHandler";
import { getUserById } from "../controllers/user";

const userRoutes = Router();
userRoutes.get(
    "/:id",
    [authMiddleware, adminMiddleware],
    errorHandler(getUserById)
);
export default userRoutes;
