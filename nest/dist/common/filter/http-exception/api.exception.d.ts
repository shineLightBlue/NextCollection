import { HttpException, HttpStatus } from "@nestjs/common";
import { ApiErrorCode } from "src/common/enmus/api-error-code.enum";
export declare class ApiException extends HttpException {
    private errorMessage;
    private errorCode;
    constructor(errorMessage: string, errorCode: ApiErrorCode, statusCode?: HttpStatus);
    getErrorCode(): ApiErrorCode;
    getErrorMessage(): string;
}
