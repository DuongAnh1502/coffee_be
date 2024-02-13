import { Request, Response } from "express";
import { LoginSchema, SignUpSchema } from "../schemas/users";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import { BadRequestException } from "../exceptions/bard-request";
import { ErrorCodes } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { NotFoundException } from "../exceptions/not-found";
import { JWT_SECRET } from "../secret";

export const signup = async (req: Request, res: Response) => {
    const validatedData = SignUpSchema.parse(req.body);
    const { name, email, password } = validatedData;
    let user = await prismaClient.user.findFirst({
        where: {
            email,
        },
    });
    if (user) {
        throw new BadRequestException(
            "User already exists!",
            ErrorCodes.USER_ALREADY_EXISTS
        );
    }
    user = await prismaClient.user.create({
        data: {
            name: name,
            email: email,
            password: hashSync(password, 10),
        },
    });
    res.json(user);
};

export const login = async (req: Request, res: Response) => {
    const validatedData = LoginSchema.parse(req.body);
    const user = await prismaClient.user.findFirst({
        where: {
            email: validatedData.email,
        },
    });
    if (!user) {
        throw new NotFoundException(
            "User not found!",
            ErrorCodes.USER_NOT_FOUND
        );
    }
    if (!compareSync(validatedData.password, user.password)) {
        throw new BadRequestException(
            "Incorrect password!",
            ErrorCodes.INCORRECT_PASSWORD
        );
    }
    const token = jwt.sign(
        {
            userId: user.id,
        },
        JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
    const { password, ...loginUser } = user;
    res.json({ loginUser, token });
};

export const getMe = (req: Request, res: Response) => {
    res.json(req.user);
};
