import { BurnAfter, Note } from "../models/Notes";
import { generateId } from "../utils/generateId";
import { AppError } from "../utils/AppError";

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

export const openNote = async (id: string) => {
  const now = new Date();

  // Try to burn a "view" note in ONE atomic step:
  // find it + mark viewed + erase content, and return the OLD document.
  const burned = await Note.findOneAndUpdate(
    { publicId: id, burnAfter: "view", viewed: false, expiresAt: { $gt: now } },
    { $set: { viewed: true, content: "" } },
    { returnDocument: "before" }
  );
  if (burned) {
    return { content: burned.content, burnAfter: burned.burnAfter };
  }

  // Nothing was burned, so find out why.
  const note = await Note.findOne({ publicId: id });

  if (!note || note.expiresAt.getTime() <= now.getTime()) {
    throw new AppError(404, "NOT_FOUND", "Note not found");
  }
  if (note.burnAfter === "view") {
    throw new AppError(410, "NOTE_ALREADY_VIEWED", "This note has already been opened");
  }

  // A timed note that is still alive can be opened many times.
  return { content: note.content, burnAfter: note.burnAfter };
};