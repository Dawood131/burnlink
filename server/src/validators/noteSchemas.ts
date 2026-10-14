import { z } from "zod";
import { BURN_OPTIONS } from "../models/Notes";

export const createNoteSchema = z.object({
  content: z
    .string()
    .min(1, "Content is required")
    .max(10000, "Content is too long (max 10000 characters)"),
  burnAfter: z.enum(BURN_OPTIONS, {
    message: "burnAfter must be one of: view, 1h, 24h, 7d",
  }),
});