import { Router } from "express";
import authRoutes from "./auth";
import productRoutes from "./product";
import addressRoutes from "./address";

const rootRouter: Router = Router();

rootRouter.use("/v1/auth", authRoutes);
rootRouter.use("/v1/products", productRoutes);
rootRouter.use("/v1/addresses", addressRoutes);

export default rootRouter;
