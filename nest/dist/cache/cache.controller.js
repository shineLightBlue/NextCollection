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
exports.CacheController = void 0;
const common_1 = require("@nestjs/common");
const cache_service_1 = require("./cache.service");
const create_cache_dto_1 = require("./dto/create-cache.dto");
const update_cache_dto_1 = require("./dto/update-cache.dto");
let CacheController = class CacheController {
    constructor(cacheService) {
        this.cacheService = cacheService;
    }
    create(createCacheDto) {
        return null;
    }
    findAll() {
        return null;
    }
    findOne(id) {
        return null;
    }
    update(id, updateCacheDto) {
        return null;
    }
    remove(id) {
        return null;
    }
};
exports.CacheController = CacheController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cache_dto_1.CreateCacheDto]),
    __metadata("design:returntype", void 0)
], CacheController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CacheController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CacheController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cache_dto_1.UpdateCacheDto]),
    __metadata("design:returntype", void 0)
], CacheController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CacheController.prototype, "remove", null);
exports.CacheController = CacheController = __decorate([
    (0, common_1.Controller)('cache'),
    __metadata("design:paramtypes", [cache_service_1.CacheService])
], CacheController);
//# sourceMappingURL=cache.controller.js.map