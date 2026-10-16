import { useMutation } from "@tanstack/react-query";
import { ApiError, createNote, openNote } from "../services/api";
import type { CreateNoteInput, CreateNoteResponse, Note } from "../types/note";

export const useCreateNote = () =>
  useMutation<CreateNoteResponse, ApiError, CreateNoteInput>({ mutationFn: createNote });

export const useOpenNote = () => useMutation<Note, ApiError, string>({ mutationFn: openNote });