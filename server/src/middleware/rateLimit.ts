import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

// Every blocked request gets our standard error format with status 429
const handler = (_req: Request, res: Response) => {
  res.status(429).json({ error: "RATE_LIMITED", message: "Too many requests, please slow down" });
};

// Creating notes: 30 per 15 minutes per IP
export const createNoteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler,
});

// Opening notes: stricter, 20 per 15 minutes per IP
export const openNoteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler,
});