import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../landing/LandingPage";
import DashboardHome from "../dashboard/DashboardHome";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../auth/AuthContext";
import ComingSoon from "../landing/ComingSoon";
import MenuPage from "../menu/MenuPage";
import StaffDashboard from "../staff/StaffDashboard";
import OrderPage from "../menu/OrderPage";
import InvoicePage from "../menu/InvoicePage";

const AppRoutes = () => {
  const { profile, loading } = useAuth();

  // ⛔ wait until profile is resolved
  if (loading) return null;

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/menu/:hotelId" element={<MenuPage />} />
      
      {/* Order Flow (Public - QR Users) */}
      <Route path="/order/:hotelId" element={<OrderPage />} />
      <Route path="/invoice/:hotelId/:orderId" element={<InvoicePage />} />

      {/* Manager Dashboard */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute role="manager">
            <DashboardHome />
          </ProtectedRoute>
        }
      />

      {/* Staff Dashboard */}
      <Route
        path="/staff/StaffDashboard/*"
        element={
          <ProtectedRoute role="staff">
            <StaffDashboard />
          </ProtectedRoute>
        }
      />

      {/* Smart Redirect */}
      <Route
        path="/redirect"
        element={
          <ProtectedRoute>
            {profile?.role === "manager" ? (
              <Navigate to="/dashboard" replace />
            ) : profile?.role === "staff" ? (
              <Navigate to="/staff/StaffDashboard" replace />
            ) : (
              <Navigate to="/" replace />
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
