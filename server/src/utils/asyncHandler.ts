import { NextFunction, Request, RequestHandler, Response } from "express";

// Wraps an async controller so any thrown error goes to the global error handler
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>): RequestHandler =>
  (req, res, next) => {
    fn(req, res, next).catch(next);
  };