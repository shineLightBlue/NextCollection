"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCacheDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_cache_dto_1 = require("./create-cache.dto");
class UpdateCacheDto extends (0, swagger_1.PartialType)(create_cache_dto_1.CreateCacheDto) {
}
exports.UpdateCacheDto = UpdateCacheDto;
//# sourceMappingURL=update-cache.dto.js.map