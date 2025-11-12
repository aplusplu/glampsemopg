// src/components/routing/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function ProtectedRoute({ children, requireRole }) {
  const { token, user } = useAuth();

  if (!token) return <Navigate to="/login" replace />;

  if (requireRole && user?.role !== requireRole) {
    // dacă vrei, poți redirecționa la / (sau pagina 403)
    return <Navigate to="/" replace />;
  }
  return children;
}
