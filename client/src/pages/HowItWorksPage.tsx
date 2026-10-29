const steps = [
  {
    title: "1. Write and choose",
    text: "Type your note and choose when it should be destroyed: after one view, or after 1 hour, 24 hours or 7 days.",
  },
  {
    title: "2. Share the link",
    text: "You get a unique link with a long random id that cannot be guessed. Send it to the person who needs it.",
  },
  {
    title: "3. They reveal it",
    text: "The recipient first sees a warning page. The note is only requested when they click Reveal, so link previews and bots cannot burn it by accident.",
  },
  {
    title: "4. It burns",
    text: "A one-view note is erased from our database the moment it is revealed, and opening the link again shows that it was already opened. Timed notes are deleted automatically when they expire.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">How it works</h1>

      <div className="space-y-4">
        {steps.map((s) => (
          <div key={s.title} className="rounded-lg border border-gray-800 bg-gray-900 p-4">
            <h2 className="font-semibold">{s.title}</h2>
            <p className="mt-1 text-sm text-gray-400">{s.text}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-yellow-700/50 bg-yellow-900/10 p-4">
        <h2 className="font-semibold">What BurnLink can and cannot protect</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-300">
          <li>Right now, notes are stored on our server as plain text until they are opened or expire. Encryption in your browser is planned.</li>
          <li>We never write note content to our logs.</li>
          <li>Anyone who has the link can read the note, so only share it with the right person.</li>
          <li>Once a note is revealed, the recipient can copy it or take a screenshot.</li>
          <li>BurnLink is in beta. Please don't share highly sensitive secrets such as bank passwords yet.</li>
        </ul>
      </div>
    </div>
  );
}