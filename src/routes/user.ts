import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { errorHandler } from "../errorHandler";
import { getListUser, getUserById, updateUser } from "../controllers/user";

const userRoutes = Router();

userRoutes.get(
    "/",
    [authMiddleware, adminMiddleware],
    errorHandler(getListUser)
);
userRoutes.get(
    "/:id",
    [authMiddleware, adminMiddleware],
    errorHandler(getUserById)
);
userRoutes.put("/:id", [authMiddleware], errorHandler(updateUser));
export default userRoutes;
