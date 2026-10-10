import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";
import mongoose from "mongoose";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientOrigin }));
app.use(express.json({ limit: "20kb" }));

app.get("/health", (_req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;
  res.status(dbConnected ? 200 : 503).json({
    status: dbConnected ? "ok" : "error",
    db: dbConnected ? "connected" : "disconnected",
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
