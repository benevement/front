import { create } from 'zustand';
import { IAuthState, roleType } from '../interfaces/IUser';

// 12/08 : déplacement interface "AuthState" vers interfaces/IUsers.ts
// interface renommée IAuthState

export const useAuthStore = create<IAuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  setAuth: (user, token) => {
    localStorage.setItem('token', token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));
