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

export const AddDefaultShippingSchema = z.object({
    defaultShippingAddress: z.string(),
});

export const UpdateUserSchema = z.object({
    name: z.string().optional(),
    defaultShippingAddress: z.string().optional(),
});
