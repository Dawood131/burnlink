import { BurnAfter, Note } from "../models/Notes";
import { generateId } from "../utils/generateId";

const HOURS = 60 * 60 * 1000;
const LIFETIME_MS: Record<BurnAfter, number> = {
  view: 7 * 24 * HOURS,
  "1h": HOURS,
  "24h": 24 * HOURS,
  "7d": 7 * 24 * HOURS,
};

export const createNote = async (content: string, burnAfter: BurnAfter) => {
  const publicId = generateId();
  const expiresAt = new Date(Date.now() + LIFETIME_MS[burnAfter]);

  await Note.create({ publicId, content, burnAfter, expiresAt });
  return { id: publicId, expiresAt };
};
