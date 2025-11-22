import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("yts_admin_auth");
    navigate("/admin/login");
  };

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  })();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <div className="text-sm text-gray-600 hidden md:block">
              Welcome, {user.name || "Admin"}
            </div>
          </div>

          <nav className="flex items-center gap-3">
            <Link
              to="/admin"
              className="px-3 py-1 rounded-md text-sm border bg-white"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/events"
              className="px-3 py-1 rounded-md text-sm border bg-white"
            >
              Events
            </Link>
            <Link
              to="/admin/contacts"
              className="px-3 py-1 rounded-md text-sm border bg-white"
            >
              Contacts
            </Link>
            <Link
              to="/admin/users"
              className="px-3 py-1 rounded-md text-sm border bg-white"
            >
              Users
            </Link>
            <button
              onClick={logout}
              className="px-3 py-1 rounded-md bg-red-500 text-white text-sm"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );

}
