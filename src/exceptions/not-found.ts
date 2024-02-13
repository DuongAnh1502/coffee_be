import { HttpException } from "./root";

export class NotFoundException extends HttpException {
    constructor(message: string, errorCode: number, err?: any) {
        super(message, errorCode, 404, err);
    }
}
