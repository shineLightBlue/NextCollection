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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const common_2 = require("@nestjs/typeorm/dist/common");
const user_entity_1 = require("./entities/user.entity");
const api_exception_1 = require("../common/filter/http-exception/api.exception");
const api_error_code_enum_1 = require("../common/enmus/api-error-code.enum");
const role_entity_1 = require("../role/entities/role.entity");
const cache_service_1 = require("../cache/cache.service");
let UserService = class UserService {
    constructor(cacheService, userRespository, roleRepository) {
        this.cacheService = cacheService;
        this.userRespository = userRespository;
        this.roleRepository = roleRepository;
    }
    async create(createUserDto) {
        const { username, password, roleIds } = createUserDto;
        const existUser = await this.userRespository.findOne({
            where: { username }
        });
        if (existUser) {
            throw new api_exception_1.ApiException('用户已存在', api_error_code_enum_1.ApiErrorCode.USER_EXIST);
        }
        try {
            const roles = await this.roleRepository.find({
                where: {
                    id: (0, typeorm_1.In)(roleIds)
                }
            });
            console.log(roles, 'roles');
            const newUser = await this.userRespository.create({
                username,
                password,
                roles
            });
            console.log(newUser);
            return await this.userRespository.save(newUser);
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(username) {
        const user = await this.userRespository.findOne({
            where: { username }
        });
        if (!user)
            throw new common_1.HttpException('用户名不存在', common_1.HttpStatus.BAD_REQUEST);
        return user;
    }
    async findPermissionNames(token, userInfo) {
        const user = await this.userRespository.findOne({
            where: { username: userInfo.username },
            relations: ['roles', 'roles.permissions']
        });
        console.log(user, 'user');
        if (user) {
            console.log(user.roles.map(role => role.permissions), 'map');
            console.log(user.roles.flatMap(role => role.permissions), 'flatMap');
            const permissions = user.roles.flatMap((role) => role.permissions);
            const permissionNames = permissions.map((item) => item.name);
            console.log(...new Set(permissionNames));
            return [...new Set(permissionNames)];
        }
        else {
            return [];
        }
    }
    async test(testParams) {
        return await this.cacheService.set('name', 'dfxy');
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_2.InjectRepository)(user_entity_1.User)),
    __param(2, (0, common_2.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [cache_service_1.CacheService,
        typeorm_1.Repository,
        typeorm_1.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map