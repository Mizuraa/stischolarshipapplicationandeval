import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);

      if (requireAdmin) {
        // Optional: Check if user email belongs to the scholarship committee / admin domain
        // Or check a role column in your database
        const adminEmails = [
          "admin@ortigascainta.sti.edu",
          "committee@sti.edu",
        ];
        if (
          adminEmails.includes(user.email || "") ||
          user.email?.endsWith("@sti.edu")
        ) {
          setIsAdmin(true);
        }
      }

      setLoading(false);
    }

    checkAuth();
  }, [requireAdmin]);

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500">
        Verifying session security.
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-red-50 border border-red-200 rounded-2xl text-red-800">
        <h2 className="font-bold text-lg mb-1">Access Denied</h2>
        <p className="text-xs">
          You do not have administrative privileges to view the Reviewer &
          Validator dashboard.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
