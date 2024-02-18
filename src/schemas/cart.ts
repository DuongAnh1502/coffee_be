import { z } from "zod";

export const addItemSchema = z.object({
    productId: z.string(),
    quantity: z.number(),
});
