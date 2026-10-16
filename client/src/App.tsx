import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ViewNotePage from "./pages/ViewNotePage";
import HowItWorksPage from "./pages/HowItWorksPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/n/:id" element={<ViewNotePage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}