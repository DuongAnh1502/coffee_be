import { z } from "zod";

export const AddAddressSchema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
});

export const UpdateAddressSchema = z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
});
