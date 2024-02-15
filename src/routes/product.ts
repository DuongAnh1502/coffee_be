import { Router } from "express";
import {
    addProduct,
    deleteProduct,
    getProductById,
    listProducts,
    updateProduct,
} from "../controllers/product";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { errorHandler } from "../errorHandler";

const productRoutes = Router();
productRoutes.post(
    "/",
    [authMiddleware, adminMiddleware],
    errorHandler(addProduct)
);
productRoutes.put(
    "/:id",
    [authMiddleware, adminMiddleware],
    errorHandler(updateProduct)
);
productRoutes.get("/", errorHandler(listProducts));
productRoutes.get(
    "/:id",
    [authMiddleware, adminMiddleware],
    errorHandler(getProductById)
);
productRoutes.delete(
    "/:id",
    [authMiddleware, adminMiddleware],
    errorHandler(deleteProduct)
);
export default productRoutes;
