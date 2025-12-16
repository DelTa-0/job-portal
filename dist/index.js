"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_config_1 = require("./config/app.config");
const database_1 = __importDefault(require("./setup/database"));
const server_1 = require("./setup/server");
const startServer = async () => {
    try {
        server_1.app.listen(app_config_1.APP_CONFIG.PORT, () => {
            console.log(`Server is running on port ${app_config_1.APP_CONFIG.PORT}`);
        });
        try {
            await database_1.default.authenticate();
            await database_1.default.sync();
            console.log("Database connected successfully");
        }
        catch (err) {
            console.log("Database connection failed:", err);
            throw err;
        }
    }
    catch (err) {
        console.log("Failed to start server:", err);
        process.exit(1);
    }
};
startServer();
