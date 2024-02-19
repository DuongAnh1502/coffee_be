import { z } from "zod";

export const AddItemSchema = z.object({
    productId: z.string(),
    quantity: z.number().positive(),
});

export const QuantitySchema = z.object({
    quantity: z.number().positive(),
});
