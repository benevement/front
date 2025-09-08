// services/userService.ts
import api, { refreshToken } from './api';
import { RoleType, UserAddressInterface } from '../interfaces/IUser';
import { useEffect } from 'react';
import { useAuthStore } from "../stores/useAuthStore";
import { decodeToken } from "../interfaces/IJwtPayload";
import { IUser } from "../interfaces/IUser";
//import { RoleType } from "../../../back/generated/prisma/index";




/* export interface IUser {
  id: number;
  email: string;
  role: roleType;
  phone_number?: string;
} */

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  phone_number?: string;
}

export const useRestoreSession = () => {
  const { user } = useAuthStore();

   useEffect(() => {
    const flag = localStorage.getItem("isAuthenticated") === "true";
    console.log("flag value", flag)

   const restore = async () => {
      if (flag && !user) {
        console.log("[Restore] Restoring session...");
        try {
          await refreshToken();
        } catch (err) {
          console.log("[Restore] Cannot restore session", err);
        }
      }
    };

    restore();
  }, [user]);
};

export const updateStoreWithToken = (accessToken: string) => {
  const decoded = decodeToken(accessToken);
  if (!decoded) return;

  const user: IUser = {
    id: decoded.sub,
    email: decoded.email,
    //role: decoded.role as RoleType,
    role: decoded.role as RoleType,
    first_name: decoded.first_name ?? "",
    last_name: decoded.last_name ?? "",
    phone_number: decoded.phone_number ?? "",
    address: decoded.address_id ?? "",
  };

  // On met directement le token et le user dans le store
  useAuthStore.setState({
    accessToken,
    user,
    isAuthenticated: true,
  });

  console.log("nouvel user", user)
};


export default class UserService {
  private store = useAuthStore.getState();

  private setAuth = (accessToken: string, ) => {
    this.store.setAuth(accessToken);
  };

  // --- AUTH ---
  login = async (input: LoginInput) => {
    try {
      const response = await api.post<{ accessToken: string }>('/auth/login', input);
      const { accessToken } = response.data;
      this.setAuth(accessToken);
    } catch (error) {
      console.error(error);
      throw new Error('Login failed');
    }
  };

  register = async (input: RegisterInput) => {
    try {
      const response = await api.post<{ user: IUser, accessToken : string, refreshToken: string }>('/auth/register', input);
      const { accessToken  } = response.data;
      this.setAuth( accessToken );

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
  updateUserPut = async (id: number, data: Omit<UserAddressInterface, 'id' | 'password' | 'avatar'>) => {
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

// calcul de l'age d'un user
export function agecalc(birthday: Date): number {
  birthday = new Date(birthday);
  const age = Number(((Date.now() - birthday.getTime()) / 31536000000).toFixed(0));
  return age;
}
