import { Router } from "express";
import authRoutes from "./auth";
import productRoutes from "./product";
import addressRoutes from "./address";
import cartRoutes from "./cart";
import userRoutes from "./user";

const rootRouter: Router = Router();

rootRouter.use("/v1/auth", authRoutes);
rootRouter.use("/v1/products", productRoutes);
rootRouter.use("/v1/addresses", addressRoutes);
rootRouter.use("/v1/carts", cartRoutes);
rootRouter.use("/v1/users", userRoutes);

export default rootRouter;
