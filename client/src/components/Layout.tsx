import { NavLink, Outlet } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded px-3 py-1 text-sm ${
    isActive ? "bg-orange-500 text-white" : "text-gray-300 hover:text-white"
  }`;

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800">
        <nav className="mx-auto flex max-w-3xl items-center justify-between p-4">
          <span className="text-xl font-bold">BurnLink</span>
          <div className="flex gap-2">
            <NavLink to="/" end className={linkClass}>
              Create
            </NavLink>
            <NavLink to="/how-it-works" className={linkClass}>
              How it works
            </NavLink>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-3xl p-4">
        <Outlet />
      </main>
    </div>
  );
}