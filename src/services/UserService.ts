// services/userService.ts
import api, { refreshToken } from './api';
import { IUpdateProfile, RoleType } from '../interfaces/IUser';
import { useEffect } from 'react';
import { useAuthStore } from "../stores/useAuthStore";
import { decodeToken } from "../interfaces/IJwtPayload";
import { IUser } from "../interfaces/IUser";
import axios from 'axios';


export interface LoginInput {
  email: string;
  password?: string;  // password rendu optionnel 05/10 à cause implémentation OAuth2 Google
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
    role: decoded.role as RoleType,
    first_name: decoded.first_name ?? "",
    last_name: decoded.last_name ?? "",
    phone_number: decoded.phone_number ?? "",
    //address: decoded.address_id ?? "",
    address_id: decoded.address_id ?? 0,
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

  private setAuth = (accessToken: string,) => {
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
      const response = await api.post<{ user: IUser, accessToken: string, refreshToken: string }>('/auth/register', input);
      const { accessToken } = response.data;
      this.setAuth(accessToken);

    } catch (error) {
      if (axios.isAxiosError(error)) { // catch le user déjà registered en base
        const status = error.response?.status;
        if (status === 405) {
          alert("Une erreur s'est produite: l'enregistrement de votre compte n'a pas abouti (utilisateur déjà existant).");
          console.warn("Utilisateur déjà en base");
          window.location.href = '/signup'; // redirection (sinon ça login ??)
        } else {
          console.error("Erreur inattendue:", error);
          throw new Error('Registration failed');
        }
      } else {
        console.error("Erreur inattendue:", error);
        throw new Error('Registration failed');
      }
    }
  };


  logout = () => {
    this.store.logout();
  };
  // --- CRUD USERS ---
  getUsers = async (limit?: number): Promise<IUser[]> => {
    try { // 05/10/25 : ajout d'un paramètre "limite" optionnel
      const response = await api.get('/users', { params: limit ? { limit } : {} });
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
  //updateUserPut = async (id: number, userAddress: Omit<UserAddressInterface, 'id' | 'password' | 'avatar'>) => {
  updateUserPut = async (id: number, userAddress: IUpdateProfile) => {
    try {
      console.log(`Dans updateUserPut id : ${id} - userAddress.address.zip_code : ${userAddress.address?.zip_code}`)
      //console.log("userAddress DEBUG : ", userAddress)
      //const {password, ...filteredUserAddress} = userAddress;
      const response = await api.put(`/users/${id}`, userAddress);
      
      console.log("response suite updateUserPut : ", response.data)
      return response.data;
    } catch (error) {
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
export function agecalc(birthday: string): number {
  let birthday2 = new Date(birthday);
  const age = Number(((Date.now() - birthday2.getTime()) / 31536000000).toFixed(0));
  return age;
}
