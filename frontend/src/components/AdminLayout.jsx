import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Shield } from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

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

  const navLink = (path, label) => (
    <Link
      to={path}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
        ${
          location.pathname === path
            ? "bg-blue-600 text-white shadow-sm"
            : "text-gray-600 hover:bg-gray-100"
        }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Admin Panel
              </h2>
            </div>

            <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
              <span>Welcome,</span>
              <span className="font-medium text-gray-700">
                {user.name || "Admin"}
              </span>
              {user.role && (
                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-600">
                  {user.role}
                </span>
              )}
            </div>
          </div>

          {/* Right Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navLink("/admin", "Dashboard")}
            {navLink("/admin/events", "Events")}
            {navLink("/admin/registrations", "Registrations")}
            {navLink("/admin/contacts", "Contacts")}
            {navLink("/admin/users", "Users")}

            <button
              onClick={logout}
              className="ml-3 px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
