/*
import api from '../api';
import { useAuthStore } from '../../stores/useAuthStore';
import {UserSignInInterface, UserSignupInterface, roleType } from '../../interfaces/IUser';
import { setUncaughtExceptionCaptureCallback } from 'process';


// commenté suite import UserSignInInterface, UserSignupInterface 

type LoginInput = {
=======
// stores/useAuthStore.ts
import { create } from 'zustand';

interface User {
  id: number;
>>>>>>> 1f501829afe576b7e04be1fecf169d9fa1b6918f
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

*/

// TODO: supprimer ce fichier si OK