import { z } from "zod";

export const AddProductSchema = z.object({
    name: z.string(),
    image: z.string(),
    description: z.string(),
    price: z.number().positive(),
    tags: z.array(z.string()),
});

export const UpdateProductSchema = z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    tags: z.array(z.string()).optional(),
});
