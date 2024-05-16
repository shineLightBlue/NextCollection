"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheModule = void 0;
const common_1 = require("@nestjs/common");
const cache_service_1 = require("./cache.service");
const cache_controller_1 = require("./cache.controller");
const redis_1 = require("redis");
let CacheModule = class CacheModule {
};
exports.CacheModule = CacheModule;
exports.CacheModule = CacheModule = __decorate([
    (0, common_1.Module)({
        controllers: [cache_controller_1.CacheController],
        providers: [cache_service_1.CacheService,
            {
                provide: 'REDIS_CLIENT',
                async useFactory() {
                    const client = (0, redis_1.createClient)({
                        socket: {
                            host: process.env.RD_HOST,
                            port: parseInt(process.env.RD_PORT)
                        }
                    });
                    await client.connect();
                    return client;
                }
            }],
        exports: [cache_service_1.CacheService]
    })
], CacheModule);
//# sourceMappingURL=cache.module.js.map