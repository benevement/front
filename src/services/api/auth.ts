// stores/useAuthStore.ts
import { create } from 'zustand';

interface User {
  id: number;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  setAuth: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  setAuth: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
