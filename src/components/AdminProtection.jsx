import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function AdminProtection({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const authData = localStorage.getItem("yts_admin_auth");
      if (authData) {
        const parsed = JSON.parse(authData);
        if (parsed.isAuthenticated) {
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error("Auth check error:", error);
      localStorage.removeItem("yts_admin_auth");
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
