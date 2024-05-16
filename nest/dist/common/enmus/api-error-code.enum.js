"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiErrorCode = void 0;
var ApiErrorCode;
(function (ApiErrorCode) {
    ApiErrorCode[ApiErrorCode["SUCCESS"] = 200] = "SUCCESS";
    ApiErrorCode[ApiErrorCode["USER_ID_INVALID"] = 10001] = "USER_ID_INVALID";
    ApiErrorCode[ApiErrorCode["USER_NOTEXIST"] = 10002] = "USER_NOTEXIST";
    ApiErrorCode[ApiErrorCode["USER_EXIST"] = 10003] = "USER_EXIST";
    ApiErrorCode[ApiErrorCode["PERMISSSION_EXIST"] = 10004] = "PERMISSSION_EXIST";
    ApiErrorCode[ApiErrorCode["ROLE_EXIST"] = 10005] = "ROLE_EXIST";
    ApiErrorCode[ApiErrorCode["PASSWORD_ERROR"] = 20005] = "PASSWORD_ERROR";
    ApiErrorCode[ApiErrorCode["FORBIDDEN"] = 400] = "FORBIDDEN";
    ApiErrorCode[ApiErrorCode["LOGIN_EXPIRE"] = 401] = "LOGIN_EXPIRE";
    ApiErrorCode[ApiErrorCode["Forbidden"] = 403] = "Forbidden";
    ApiErrorCode[ApiErrorCode["DATABASE_ERROR"] = 30001] = "DATABASE_ERROR";
})(ApiErrorCode || (exports.ApiErrorCode = ApiErrorCode = {}));
//# sourceMappingURL=api-error-code.enum.js.map