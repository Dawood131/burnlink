import { Schema, model } from "mongoose";

export const BURN_OPTIONS = ["view", "1h", "24h", "7d"] as const;
export type BurnAfter = (typeof BURN_OPTIONS)[number];

const noteSchema = new Schema({
  publicId: { type: String, required: true, unique: true },
  content: { type: String, default: "" },
  burnAfter: { type: String, enum: BURN_OPTIONS, required: true },
  viewed: { type: Boolean, default: false },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
  createdAt: { type: Date, default: Date.now },
});

export const Note = model("Notes", noteSchema);
