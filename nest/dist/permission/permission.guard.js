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
exports.PermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const api_error_code_enum_1 = require("../common/enmus/api-error-code.enum");
const api_exception_1 = require("../common/filter/http-exception/api.exception");
const user_service_1 = require("../user/user.service");
let PermissionGuard = class PermissionGuard {
    constructor(reflector, userService) {
        this.reflector = reflector;
        this.userService = userService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const requirePermissions = this.reflector.getAllAndOverride('permissions', [context.getClass(), context.getHandler()]) || [];
        if (requirePermissions.length === 0)
            return true;
        const [, token] = request.headers.authorization?.split(' ') ?? [];
        const permissionNames = await this.userService.findPermissionNames(token, request.user);
        console.log(permissionNames, 'permissionNames');
        const isContainedPermission = requirePermissions.every((item => permissionNames.includes(item)));
        if (!isContainedPermission) {
            throw new api_exception_1.ApiException('权限不足', api_error_code_enum_1.ApiErrorCode.Forbidden);
        }
        return true;
    }
};
exports.PermissionGuard = PermissionGuard;
exports.PermissionGuard = PermissionGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        user_service_1.UserService])
], PermissionGuard);
//# sourceMappingURL=permission.guard.js.map