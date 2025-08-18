import api from '../api';
import { useAuthStore } from '../../stores/useAuthStore';
import {UserSignInInterface, UserSignupInterface, roleType } from '../../interfaces/IUser';
import { setUncaughtExceptionCaptureCallback } from 'process';


// commenté suite import UserSignInInterface, UserSignupInterface 
/*
type LoginInput = {
  email: string;
  password: string;
};


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
