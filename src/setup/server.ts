import express from "express";
import dotenv from "dotenv";
import router from "./router";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import CustomError from "../error";
import "../helper/mail-helper/mail.event";
dotenv.config();
import path from "path";
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "..", "uploads")),
);

app.use("/api/v1", router);

//global error handling
function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
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

export { app };
