import { useParams } from "react-router-dom";

export default function ViewNotePage() {
  const { id } = useParams();
  return <h1 className="text-2xl font-bold">View note: {id}</h1>;
}