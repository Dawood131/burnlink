import { useState } from "react";
import type { FormEvent } from "react";
import { useCreateNote } from "../hooks/useNotes";
import type { BurnAfter } from "../types/note";

const BURN_OPTIONS: { value: BurnAfter; label: string }[] = [
  { value: "view", label: "Burn after 1 view" },
  { value: "1h", label: "Expires in 1 hour" },
  { value: "24h", label: "Expires in 24 hours" },
  { value: "7d", label: "Expires in 7 days" },
];

const MAX_LENGTH = 10000;

export default function HomePage() {
  const [content, setContent] = useState("");
  const [burnAfter, setBurnAfter] = useState<BurnAfter>("view");
  const [copied, setCopied] = useState(false);
  const create = useCreateNote();

  const link = create.data ? `${window.location.origin}/n/${create.data.id}` : "";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    create.mutate({ content, burnAfter });
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const createAnother = () => {
    create.reset();
    setContent("");
    setCopied(false);
  };

  // Success screen
  if (create.isSuccess) {
    return (
      <div className="space-y-4 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h1 className="text-2xl font-bold">Your note is ready</h1>
        <p className="text-sm text-gray-400">
          {burnAfter === "view"
            ? "This link works once. After it is opened, the note is destroyed."
            : `This link works until ${new Date(create.data.expiresAt).toLocaleString()}.`}
        </p>
        <div className="flex gap-2">
          <input
            readOnly
            value={link}
            className="w-full rounded border border-gray-700 bg-gray-950 px-3 py-2 text-sm"
          />
          <button
            onClick={copyLink}
            className="rounded bg-orange-500 px-4 py-2 text-sm font-medium hover:bg-orange-600"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <button onClick={createAnother} className="text-sm text-orange-400 underline">
          Create another note
        </button>
      </div>
    );
  }

  // Form screen
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold">Create a self-destructing note</h1>

      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={MAX_LENGTH}
          rows={8}
          placeholder="Type your secret here..."
          className="w-full rounded border border-gray-700 bg-gray-900 p-3 text-sm"
        />
        <p className="mt-1 text-right text-xs text-gray-500">
          {content.length} / {MAX_LENGTH}
        </p>
      </div>

      <select
        value={burnAfter}
        onChange={(e) => setBurnAfter(e.target.value as BurnAfter)}
        className="w-full rounded border border-gray-700 bg-gray-900 p-2 text-sm"
      >
        {BURN_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {create.isError && <p className="text-sm text-red-400">{create.error.message}</p>}

      <button
        type="submit"
        disabled={!content.trim() || create.isPending}
        className="w-full rounded bg-orange-500 px-4 py-2 font-medium hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {create.isPending ? "Creating..." : "Create note"}
      </button>

      <p className="text-xs text-gray-500">
        Beta: please don't share highly sensitive secrets yet.
      </p>
    </form>
  );
}