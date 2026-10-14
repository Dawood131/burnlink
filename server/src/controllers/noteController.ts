import { Request, Response } from "express";
import { createNote, openNote } from "../services/noteService";

export const createNoteController = async (req: Request, res: Response) => {
  const { content, burnAfter } = req.body;
  const result = await createNote(content, burnAfter);
  res.status(201).json(result);
};

export const openNoteController = async (req: Request, res: Response) => {
  const note = await openNote(String(req.params.id));
  res.set("Cache-Control", "no-store"); 
  res.status(200).json(note);
};