import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { errorHandler } from "../errorHandler";
import { getUserById, updateUser } from "../controllers/user";

const userRoutes = Router();
userRoutes.get(
    "/:id",
    [authMiddleware, adminMiddleware],
    errorHandler(getUserById)
);
userRoutes.put("/:id", [authMiddleware], errorHandler(updateUser));
export default userRoutes;
