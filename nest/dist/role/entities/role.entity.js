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
exports.Role = void 0;
const typeorm_1 = require("typeorm");
const permission_entity_1 = require("../../permission/entities/permission.entity");
const menu_entity_1 = require("../../menu/entities/menu.entity");
let Role = class Role {
};
exports.Role = Role;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Role.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 20
    }),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Role.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Role.prototype, "updateTime", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => permission_entity_1.Permission),
    (0, typeorm_1.JoinTable)({
        name: 'role_permission_relation'
    }),
    __metadata("design:type", Array)
], Role.prototype, "permissions", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => menu_entity_1.Menu),
    (0, typeorm_1.JoinTable)({
        name: 'role_menu_relation',
    }),
    __metadata("design:type", Array)
], Role.prototype, "menus", void 0);
exports.Role = Role = __decorate([
    (0, typeorm_1.Entity)()
], Role);
//# sourceMappingURL=role.entity.js.map