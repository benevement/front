// components/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { roleType } from "../interfaces/IUser";

type Props = {
  allowedRoles?: roleType[];   // pour les utilisateurs connectés
  allowVisitor?: boolean;      // pour autoriser l'accès aux visiteurs
};

export default function ProtectedRoute({ allowedRoles = [], allowVisitor = false }: Props) {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  // Cas visiteur
  if (!user) {
    if (allowVisitor) {
      return <Outlet />;
    }
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Cas connecté
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}
