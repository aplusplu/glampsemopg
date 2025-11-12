import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../lib/routes";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // simple fallback

  if (!user) {
    toast.info("Log ind for at få adgang.");
    return <Navigate to={ROUTES.HOME} state={{ from: location }} replace />;
  }

  return children;
}
