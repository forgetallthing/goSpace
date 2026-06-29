"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RECORD_SOURCE = exports.USER_STATUS = exports.MEDAL_STATUS = exports.RESPONSE_CODE = void 0;
exports.RESPONSE_CODE = {
    SUCCESS: 0,
    UNAUTHORIZED: 40101,
    VALIDATION_ERROR: 40001,
    NOT_FOUND: 40401,
    SERVER_ERROR: 50001,
};
exports.MEDAL_STATUS = {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
};
exports.USER_STATUS = {
    ACTIVE: 'active',
    DISABLED: 'disabled',
};
exports.RECORD_SOURCE = {
    MANUAL: 'manual',
    IMPORT: 'import',
    DEVICE: 'device',
};
//# sourceMappingURL=status.js.map