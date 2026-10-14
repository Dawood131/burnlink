import { Response, Request } from "express";
import { createNote } from "../services/noteService";

export const createNoteController = async (req: Request, res: Response) => {
  const { content, burnAfter } = req.body;
  const result = await createNote(content, burnAfter);
  res.status(201).json(result);
};
