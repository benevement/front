<<<<<<< HEAD
import api from '../api';
import { useAuthStore } from '../../stores/useAuthStore';
import { UserSignInInterface, UserSignupInterface, roleType } from '../../interfaces/IUser';


// commenté suite import UserSignInInterface, UserSignupInterface 
/*
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

<<<<<<< HEAD

type RegisterInput = {
  email: string;
  password: string;
  phone_number?: string;
};
*/

type AuthResponse = {
  access_token: string;
  user: {
    id: number;
    email: string;
    role: roleType; // MDA : changement string => roleType
  };
};

export const login = async (input: UserSignInInterface): Promise<void> => {
  const response = await api.post<AuthResponse>('/auth/login', input);
  const { access_token, user } = response.data;

  const { setAuth } = useAuthStore.getState();
  setAuth(user, access_token);

  localStorage.setItem('token', access_token);
};

export const register = async (input: UserSignupInterface): Promise<void> => {
  const response = await api.post<AuthResponse>('/auth/register', input);
  const { access_token, user } = response.data;

  const { setAuth } = useAuthStore.getState();
  setAuth(user, access_token);

  localStorage.setItem('token', access_token);
};
=======
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
>>>>>>> 1f501829afe576b7e04be1fecf169d9fa1b6918f
