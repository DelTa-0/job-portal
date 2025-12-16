"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureUploadsFolder = ensureUploadsFolder;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function ensureUploadsFolder() {
    const uploadsFolder = path_1.default.join(__dirname, "..", "..", "uploads");
    if (!fs_1.default.existsSync(uploadsFolder)) {
        fs_1.default.mkdirSync(uploadsFolder, { recursive: true });
    }
    return uploadsFolder;
}
