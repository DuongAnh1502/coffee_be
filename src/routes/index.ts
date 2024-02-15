import { Router } from "express";
import authRoutes from "./auth";
import productRoutes from "./product";

const rootRouter: Router = Router();

rootRouter.use("/v1/auth", authRoutes);
rootRouter.use("/v1/products", productRoutes);

export default rootRouter;
