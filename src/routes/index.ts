import { Router } from "express";
import authRoutes from "./auth";

const rootRouter: Router = Router();

rootRouter.use("/v1/auth", authRoutes);

export default rootRouter;
