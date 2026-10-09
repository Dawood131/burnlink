import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientOrigin }));
app.use(express.json({ limit: "20kb" }));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
