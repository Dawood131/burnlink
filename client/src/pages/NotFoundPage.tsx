import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Page not found</h1>
      <Link to="/" className="text-orange-400 underline">
        Go home
      </Link>
    </div>
  );
}