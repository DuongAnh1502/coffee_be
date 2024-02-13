export class HttpException extends Error {
    message: string;
    errorCode: ErrorCodes;
    statusCode: number;
    errors: any;
    constructor(
        message: string,
        errorCode: ErrorCodes,
        statusCode: number,
        errors: any
    ) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export enum ErrorCodes {
    USER_ALREADY_EXISTS = 1001,
    INCORRECT_PASSWORD = 1002,
    UNPROCESSABLE_ENTITY = 2001,
    UNAUTHORIZED = 3001,
    USER_NOT_FOUND = 4001,
    PRODUCT_NOT_FOUND = 4002,
    ADDRESS_NOT_FOUND = 4003,
    ORDER_NOT_FOUND = 4004,
    INTERNAL_EXCEPTION = 5001,
}
