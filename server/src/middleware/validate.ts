import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { AppError } from "../utils/AppError";

export const validate =
  (schema = ZodType) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(
        new AppError(400, "VALIDATION_ERROR", result.error.issue[0].message),
      );
    }
    req.body = result.data;
    next();
  };
