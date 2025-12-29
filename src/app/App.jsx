import { Routes, Route } from "react-router-dom";
import AppRoutes from "./routes";
import { AuthProvider } from "../auth/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
