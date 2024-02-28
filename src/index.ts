import express, { Request, Response } from "express";
import { PORT } from "./secret";
import rootRouter from "./routes";
import { errorMiddleware } from "./middlewares/errors";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());

app.use("/api", rootRouter);
export const prismaClient = new PrismaClient({
    log: ["query"],
}).$extends({
    result: {
        address: {
            formattedAddress: {
                needs: {
                    street: true,
                    city: true,
                    country: true,
                },
                compute: (address) => {
                    return `${address.country}, ${address.city}, ${address.street}`;
                },
            },
        },
    },
});

app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log("Working in host : http://localhost:" + PORT);
});
