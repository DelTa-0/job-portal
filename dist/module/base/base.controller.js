"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseController {
    sendReponse(res, statusCode, message, data) {
        res.status(statusCode).json({
            statusCode,
            message,
            data,
        });
    }
}
exports.default = BaseController;
