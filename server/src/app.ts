import express from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import { logger } from "./utils/logger";
import { env } from "./config/env";
import mongoose from "mongoose";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import noteRoutes from "./routes/noteRoutes";

const app = express();

if (env.nodeEnv === "production") {
  app.set("trust proxy", 1);
}

app.use(helmet());
app.use(cors({ origin: env.clientOrigin }));
app.use(express.json({ limit: "20kb" }));

app.use(
  pinoHttp({
    logger,
    serializers: {
      req: (req) => ({ method: req.method, url: req.url }),
      res: (res) => ({ statusCode: res.statusCode }),
    },
  }),
);

app.get("/health", (_req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;
  res.status(dbConnected ? 200 : 503).json({
    status: dbConnected ? "ok" : "error",
    db: dbConnected ? "connected" : "disconnected",
  });
});
app.use("/api/notes", noteRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
