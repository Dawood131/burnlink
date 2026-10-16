import axios, { AxiosError } from "axios";
import type { CreateNoteInput, CreateNoteResponse, Note } from "../types/note";

// One error type for the whole app. Screens read .status to decide what to show.
export class ApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

const friendlyMessage = (status: number, serverMessage?: string) => {
  switch (status) {
    case 400:
      return serverMessage ?? "Please check what you entered.";
    case 404:
      return "This note doesn't exist or has expired.";
    case 410:
      return "This note was already opened and has been destroyed.";
    case 429:
      return "Too many requests. Please wait a bit and try again.";
    default:
      return "Something went wrong on our side. Please try again.";
  }
};

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5000",
  timeout: 15000,
});

// Every failed request becomes an ApiError, in one place
http.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ error?: string; message?: string }>) => {
    if (!error.response) {
      return Promise.reject(
        new ApiError(
          0,
          "NETWORK_ERROR",
          "Can't reach the server. It may be waking up, please try again in a minute."
        )
      );
    }
    const { status, data } = error.response;
    return Promise.reject(
      new ApiError(status, data?.error ?? "UNKNOWN", friendlyMessage(status, data?.message))
    );
  }
);

export const createNote = async (input: CreateNoteInput) => {
  const res = await http.post<CreateNoteResponse>("/api/notes", input);
  return res.data;
};

export const openNote = async (id: string) => {
  const res = await http.get<Note>(`/api/notes/${encodeURIComponent(id)}`);
  return res.data;
};