// stores/useAuthStore.ts
import { create } from 'zustand';
import { roleType } from '../interfaces/IUser';

interface User {
  id: number;
  email: string;
  role: string;
}

interface AuthState {
<<<<<<< HEAD
  //user: { email: string; role: string } | null;
  user: { email: string; role: roleType } | null;
=======
  user: User | null;
>>>>>>> 1f501829afe576b7e04be1fecf169d9fa1b6918f
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
  setAuth: (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
