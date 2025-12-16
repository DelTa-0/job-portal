"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailError = exports.ForbiddenError = exports.UnauthorizedError = exports.NotFoundError = void 0;
const _1 = __importDefault(require("."));
class NotFoundError extends _1.default {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class UnauthorizedError extends _1.default {
    constructor(message) {
        super(message, 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends _1.default {
    constructor(message) {
        super(message, 403);
    }
}
exports.ForbiddenError = ForbiddenError;
class EmailError extends _1.default {
    constructor(message) {
        super(message, 403);
    }
}
exports.EmailError = EmailError;
