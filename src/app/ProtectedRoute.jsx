import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, profile, loading } = useAuth();

  // Wait for auth to resolve
  if (loading) return null;

  // Not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Role-based protection
  if (role && profile?.role !== role) {
    // Redirect safely based on role
    if (profile?.role === "manager") {
      return <Navigate to="/dashboard" replace />;
    }
    if (profile?.role === "staff") {
      return <Navigate to="/staff/StaffDashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
