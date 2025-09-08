import { AxiosError } from "axios";
import api from "../api";
import { useAuthStore } from "../../stores/useAuthStore";
import IUser, { IUserStorage } from "../../interfaces/IUser";


// récup user (id, mail) à partir du store d'authentification


//export const recUserData = async (user: IUser|null): Promise<IUserStorage|undefined> => {
  export const lStoreUserData = async (user: IUser|null): Promise<IUserStorage|undefined> => {

    /*
      select: {
        id: true,
        email: true,
        role: true,
        last_name: true,
        first_name: true,
        birthdate: true,
        phone_number: true,
      },
    */
    
/*
    if (!user?.id) {
        console.warn("Aucun user connecté, requête annulée.")
        return null;
    }
*/
    try {
      const resp = await api.get(`/users/p2/${user?.id}`);
      console.log("resp : ", resp)
      return resp.data;   
    }
    catch (error) {
      const axiosError = error as AxiosError;
      console.log("Erreur inconnue : ", error);
      console.log("axiosError : ", axiosError.message);
    }
   // return null;
  }

    export const lStoreAddressData = async (user: IUser) => {

    try {
      const resp2 = await api.get(`/address/p2/${user?.id}`);
      console.log("resp2 : ", resp2)
      return resp2.data;    
    }
    catch (error2) {
      const axiosError = error2 as AxiosError;
      console.log("Erreur inconnue : ", error2);
      console.log("axiosError : ", axiosError.message);
    }

  }