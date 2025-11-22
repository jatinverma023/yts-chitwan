import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function AdminProtection({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (token && user && user.role === "admin") {
        setIsAuthenticated(true);
      }
    } catch (err) {
      // ignore
    } finally {
      setChecking(false);
    }
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Checking authentication...</div>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  return children;
}
