import express from "express";
interface User {
    id: string;
    email: string;
    name: string | null;
    role: string;
}
declare module "express-serve-static-core" {
    export interface Request {
        user: User;
    }
}
