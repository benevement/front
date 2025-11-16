// components/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { roleType } from "../interfaces/IUser";

type Props = {
  allowedRoles?: roleType[];   // pour les utilisateurs connectés
  allowVisitor?: boolean;      // pour autoriser l'accès aux visiteurs
};

export default function ProtectedRoute({ allowedRoles = [], allowVisitor = false }: Props) {
  const { user } = useAuthStore();
  const location = useLocation();

  // Cas visiteur
  if (!user) {
    if (allowVisitor) {
      return <Outlet />;
    }
    // redirection vers /signin si utilisateur non connecté et page privée
    return <Navigate to="/signin" state={{ from: location }} replace />;
    // ** voir infos plus bas **
  }

  // Cas connecté
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}


// ** infos ** //

// state={{ from: location }} : passage d'état : Permet de transmettre des données à la route de destination.
    // from: location : on passe l'objet location (l'URL actuelle) dans le state.
    // Cela permet à la page /signin de savoir d'où vient l'utilisateur 
    // Dans la page /signin, on peut récupérer ce state avec useLocation() :
          // const location = useLocation();
          // const from = location.state?.from || "/"; // Redirection par défaut si pas de `from`
    // Si replace est à true, la redirection remplace l'entrée actuelle dans l'historique du navigateur.
    //  Sans cela, l'utilisateur pourrait revenir à la page précédente avec le bouton "Retour",
    //  ce qui n'est pas toujours souhaité (par exemple, après une déconnexion).