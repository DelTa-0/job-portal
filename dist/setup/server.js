"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = __importDefault(require("./router"));
const cors_1 = __importDefault(require("cors"));
require("../helper/mail-helper/mail.event");
dotenv_1.default.config();
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
exports.app = app;
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "../views"));
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "..", "..", "uploads")));
app.use("/api/v1", router_1.default);
//global error handling
function errorHandler(err, _req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    const message = err.message
        ? err.message
        : "There is some issue in backendside";
    const statusCode = err.statusCode ? err.statusCode : 500;
    res.status(statusCode).json({
        statusCode: statusCode,
        message: message,
    });
}
app.use(errorHandler);
