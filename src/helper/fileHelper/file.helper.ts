import fs from "fs";
import path from "path";

const uploadsFolder = path.join(__dirname, "../../uploads");

export const saveFile = (file: Express.Multer.File): string => {
  const ext = path.extname(file.originalname);
//   const filename = `${Date.now()}_${file.originalname}`;
    const filename=file.originalname;
  const filepath = path.join(uploadsFolder, filename);

  fs.writeFileSync(filepath, file.buffer); 
  return filepath; 
};
