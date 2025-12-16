"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uploadsFolder = path_1.default.join(__dirname, "../../../uploads");
const saveFile = (file) => {
    const filename = file.originalname;
    const filepath = path_1.default.join(uploadsFolder, filename);
    fs_1.default.writeFileSync(filepath, file.buffer);
    return filepath;
};
exports.saveFile = saveFile;
