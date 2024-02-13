import { HttpException } from "./root";

export class BadRequestException extends HttpException {
    constructor(message: string, errorCode: number, err?: any) {
        super(message, errorCode, 400, err);
    }
}
