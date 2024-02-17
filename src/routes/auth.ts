import { Router } from "express";
import { getMe, login, signup } from "../controllers/auth";
import { errorHandler } from "../errorHandler";
import authMiddleware from "../middlewares/auth";

const authRoutes: Router = Router();
authRoutes.post("/signup", errorHandler(signup));
authRoutes.post("/login", errorHandler(login));
authRoutes.get("/me", [authMiddleware], errorHandler(getMe));
//s
export default authRoutes;
