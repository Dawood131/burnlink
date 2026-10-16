import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useOpenNote } from "../hooks/useNotes";

// Text for each error screen
const errorCopy = (status: number) => {
  switch (status) {
    case 404:
      return {
        title: "Note not found",
        hint: "This link may be wrong, or the note has expired.",
      };
    case 410:
      return {
        title: "This note was already opened",
        hint: "It was destroyed after being read. If you didn't open it yourself, ask the sender to confirm who did.",
      };
    case 429:
      return {
        title: "Slow down",
        hint: "Too many requests. Wait a minute, then try again.",
      };
    default:
      return {
        title: "Something went wrong",
        hint: "This is on our side. You can try again.",
      };
  }
};

export default function ViewNotePage() {
  const { id = "" } = useParams();
  const open = useOpenNote();
  const [copied, setCopied] = useState(false);

  const copyContent = async () => {
    if (!open.data) return;
    await navigator.clipboard.writeText(open.data.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 1. Revealed
  if (open.isSuccess) {
    const burned = open.data.burnAfter === "view";
    return (
      <div className="space-y-4 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h1 className="text-2xl font-bold">Your note</h1>
        {/* React escapes this text, so it is safe to show untrusted content */}
        <pre className="whitespace-pre-wrap break-words rounded border border-gray-700 bg-gray-950 p-4 text-sm">
          {open.data.content}
        </pre>
        <button
          onClick={copyContent}
          className="rounded bg-orange-500 px-4 py-2 text-sm font-medium hover:bg-orange-600"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <p className="text-sm text-gray-400">
          {burned
            ? "This note has been destroyed. If you reload this page, it will not be shown again."
            : "This note stays available until it expires."}
        </p>
      </div>
    );
  }

  // 2. Error screens
  if (open.isError) {
    const { title, hint } = errorCopy(open.error.status);
    const canRetry = open.error.status === 429 || open.error.status === 0 || open.error.status >= 500;
    return (
      <div className="space-y-4 rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-gray-400">{hint}</p>
        {open.error.status === 0 && (
          <p className="text-sm text-gray-400">{open.error.message}</p>
        )}
        <div className="flex gap-4">
          {canRetry && (
            <button
              onClick={() => open.mutate(id)}
              className="rounded bg-orange-500 px-4 py-2 text-sm font-medium hover:bg-orange-600"
            >
              Try again
            </button>
          )}
          <Link to="/" className="self-center text-sm text-orange-400 underline">
            Create a new note
          </Link>
        </div>
      </div>
    );
  }

  // 3. Warning screen (nothing has been requested yet)
  return (
    <div className="space-y-4 rounded-lg border border-gray-800 bg-gray-900 p-6">
      <h1 className="text-2xl font-bold">Someone sent you a secret note</h1>
      <p className="text-sm text-gray-400">
        This note may be destroyed as soon as you reveal it. Make sure you are ready to read and
        copy it before you continue.
      </p>
      <button
        onClick={() => open.mutate(id)}
        disabled={open.isPending}
        className="rounded bg-orange-500 px-4 py-2 font-medium hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {open.isPending ? "Revealing..." : "Reveal note"}
      </button>
    </div>
  );
}