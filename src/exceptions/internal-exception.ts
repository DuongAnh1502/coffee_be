import { HttpException } from "./root";

export class InternalException extends HttpException {
    constructor(message: string, errorCode: number, err: any) {
        super(message, errorCode, 500, err);
    }
}
