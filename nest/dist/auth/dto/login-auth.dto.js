"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class LoginAuthDto {
}
exports.LoginAuthDto = LoginAuthDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: '用户名不能为空'
    }),
    (0, class_validator_1.Length)(2, 10, {
        message: '用户名长度必须为2-10之间'
    }),
    (0, swagger_1.ApiProperty)({
        example: 'admin',
        description: '用户名'
    }),
    __metadata("design:type", String)
], LoginAuthDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(5, 15, {
        message: '密码长度必须为5-15之间'
    }),
    (0, swagger_1.ApiProperty)({
        example: 'admin',
        description: '密码'
    }),
    __metadata("design:type", String)
], LoginAuthDto.prototype, "password", void 0);
//# sourceMappingURL=login-auth.dto.js.map