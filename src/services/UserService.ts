// services/userService.ts
import api from './api';
import { useAuthStore } from '../stores/useAuthStore';
import { UserAddressInterface, roleType } from '../interfaces/IUser';

export interface IUser {
  id: number;
  email: string;
  role: roleType;
  phone_number?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  phone_number?: string;
}

export default class UserService {
  private store = useAuthStore.getState();

  private setAuth = (user: IUser, accessToken: string, refreshToken: string) => {
    this.store.setAuth(user, accessToken, refreshToken);
  };

  // --- AUTH ---
  login = async (input: LoginInput): Promise<IUser> => {
    try {
      const response = await api.post<{ accessToken: string; refreshToken: string; user: IUser }>('/auth/login', input);
      const { user, accessToken, refreshToken } = response.data;
      this.store.setAuth(user, accessToken, refreshToken);
      return user;
    } catch (error) {
      console.error(error);
      throw new Error('Login failed');
    }
  };

  register = async (input: RegisterInput): Promise<IUser> => {
    try {
      const response = await api.post<{ user: IUser, access_token: string, refreshToken: string }>('/auth/register', input);
      const { user, access_token, refreshToken } = response.data;
      this.setAuth(user, access_token, refreshToken);
      return user;
    } catch (error) {
      console.error(error);
      throw new Error('Registration failed');
    }
  };

  logout = () => {
    this.store.logout();
  };
  // --- CRUD USERS ---
  getUsers = async (): Promise<IUser[]> => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch users');
    }
  };

  getUserById = async (id: number): Promise<IUser> => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get user');
    }
  };

  createUser = async (data: RegisterInput): Promise<IUser> => {
    try {
      const response = await api.post('/users', data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create user');
    }
  };

  updateUser = async (id: number, data: Partial<IUser>): Promise<IUser> => {
    try {
      const response = await api.patch(`/users/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update user');
    }
  };

  // ajout 21/08 pour update profil utilisateur
  // : Promise<UserAddressInterface>      // typage retour de fonction (problématique)
  // TODO: voir typage retour de fonction
  updateUserPut = async (id: number, data: Omit<UserAddressInterface, 'id'|'password'|'avatar'>) => {
    try {
      const response = await api.put(`/users/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update user');
    }
  };

  deleteUser = async (id: number): Promise<void> => {
    try {
      await api.delete(`/users/${id}`);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete user');
    }
  };
}
