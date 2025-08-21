// services/userService.ts
import api from './api';
import { useAuthStore } from '../stores/useAuthStore';

export interface IUser {
  id: number;
  email: string;
  role: string;
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

  private setAuth = (user: IUser, token: string) => {
    this.store.setAuth(user, token);
  };

  // --- AUTH ---
  login = async (input: LoginInput): Promise<IUser> => {
    try {
      const response = await api.post<{ access_token: string; user: IUser }>('/auth/login', input);
      const { user, access_token } = response.data;
      this.setAuth(user, access_token);
      return user;
    } catch (error) {
      console.error(error);
      throw new Error('Login failed');
    }
  };

  register = async (input: RegisterInput): Promise<IUser> => {
    try {
      const response = await api.post<{ access_token: string; user: IUser }>('/auth/register', input);
      const { user, access_token } = response.data;
      this.setAuth(user, access_token);
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

  deleteUser = async (id: number): Promise<void> => {
    try {
      await api.delete(`/users/${id}`);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete user');
    }
  };
}
