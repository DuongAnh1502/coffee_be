import { z } from "zod";

export const SignUpSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
});

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const addDefaultShippingSchema = z.object({
    defaultShippingAddress: z.string(),
});
