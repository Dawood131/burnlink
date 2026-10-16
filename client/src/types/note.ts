export type BurnAfter = "view" | "1h" | "24h" | "7d";

export interface CreateNoteInput {
  content: string;
  burnAfter: BurnAfter;
}

export interface CreateNoteResponse {
  id: string;
  expiresAt: string;
}

export interface Note {
  content: string;
  burnAfter: BurnAfter;
}