import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../landing/LandingPage";
import DashboardHome from "../dashboard/DashboardHome";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../auth/AuthContext";
import ComingSoon from "../landing/ComingSoon";

const AppRoutes = () => {
  const { profile, loading } = useAuth();

  // ⛔ wait until profile is resolved
  if (loading) return null;

  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Coming Soon for Staff or Guest */}
      <Route path="/coming-soon/:role" element={<ComingSoon />} />

      {/* Dashboard for Manager */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            {!profile ? (
              <Navigate to="/" replace />
            ) : profile.role !== "manager" ? (
              <Navigate to={`/coming-soon/${profile.role}`} replace />
            ) : (
              <DashboardHome />
            )}
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
