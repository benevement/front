import { create } from "zustand";
import { IUser } from "../interfaces/IUser";
import { decodeToken } from "../interfaces/IJwtPayload";
//import { RoleType } from "../../../back/generated/prisma/index";
import { roleType } from '../interfaces/IUser';
import { useLocation } from "react-router-dom";

type AuthState = {
  user: IUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (accessToken: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  setAuth: (accessToken) => {
    const decoded = decodeToken(accessToken);
    if (!decoded) return;

    const user: IUser = {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role as roleType,
      first_name: decoded.first_name ?? "",
      last_name: decoded.last_name ?? "",
      phone_number: decoded.phone_number ?? "",
      address_id: decoded.address_id ?? 0,
    };

    // mise à jour du store
    set({ user, accessToken, isAuthenticated: true });

    // sauvegarde manuelle du flag dans le localStorage
    localStorage.setItem("isAuthenticated", "true");
  },

  logout: () => {
    set({ user: null, accessToken: null, isAuthenticated: false });
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("uaStorage");
    //const location = useLocation();
    //const from = location.state?.from || "/signin"; // Redirection par défaut si pas de `from`

      //return <Navigate to="/signin" state={{ from: location }} replace />;
    
  },
}));
