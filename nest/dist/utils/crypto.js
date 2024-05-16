"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
exports.default = (value, salt) => crypto.pbkdf2Sync(value, salt, 1000, 18, 'sha256').toString('hex');
//# sourceMappingURL=crypto.js.map