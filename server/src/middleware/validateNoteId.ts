import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

const ID_PATTERN = /^[A-Za-z0-9_-]{22}$/;

export const validateNoteId = (req: Request, _res: Response, next: NextFunction) => {
  if (!ID_PATTERN.test(String(req.params.id))) {
    return next(new AppError(404, "NOT_FOUND", "Note not found"));
  }
  next();
};