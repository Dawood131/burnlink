import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

export const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found", message: "Route Not Found" });
};

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ error: err.code, message: err.message });
  }
  const e = err as { type?: string };
  if (e?.type === "entity.parse.failed") {
    return res.status(400).json({
      error: "INVALID_JSON",
      message: "Request body is not valid JSON",
    });
  }
  if (e?.type === "entity.too.large") {
    return res.status(413).json({
      error: "PAYLOAD_TOO_LARGE",
      message: "Request body is too large",
    });
  }

  console.error(err);
  return res
    .status(500)
    .json({ error: "INTERNAL_ERROR", message: "Something went wrong" });
};
