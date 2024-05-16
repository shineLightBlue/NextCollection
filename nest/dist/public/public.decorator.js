"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions = exports.Public = void 0;
const common_1 = require("@nestjs/common");
const Public = () => (0, common_1.SetMetadata)('isPublic', true);
exports.Public = Public;
const Permissions = (...permissions) => (0, common_1.SetMetadata)('permissions', permissions);
exports.Permissions = Permissions;
//# sourceMappingURL=public.decorator.js.map