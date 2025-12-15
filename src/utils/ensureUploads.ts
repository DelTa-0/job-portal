import fs from "fs";
import path from "path";

export function ensureUploadsFolder() {
  const uploadsFolder = path.join(__dirname, "..", "..", "uploads");
  if (!fs.existsSync(uploadsFolder)) {
    fs.mkdirSync(uploadsFolder, { recursive: true });
  }
  return uploadsFolder;
}
