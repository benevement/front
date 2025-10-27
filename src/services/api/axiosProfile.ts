import { AxiosError } from "axios";
import api from "../api";
import IUser, { IUserStorage } from "../../interfaces/IUser";

//
// récup user (id, mail) à partir du store d'authentification
//

export const lStoreUserData = async (user: IUser | null): Promise<IUserStorage | undefined> => {
  // on va chercher l'ensemble des données utilisateur à partir de de l'id du user authentifié (useAuthStore)
  try {
    //const resp = await api.get(`/users/p2/${user?.id}`); // commenté 17/09 pour suppression findOneById dans Nest users.controller.ts
    const resp = await api.get(`/users/${user?.id}`);
    console.log("[lStoreUserData] resp : ", resp)
    return resp.data;
  }
  catch (error) {
    const axiosError = error as AxiosError;
    console.log("Erreur inconnue : ", error);
    console.log("axiosError : ", axiosError.message);
  }
}

export const lStoreAddressData = async (user: IUser| null) => {
  // retourne l'adresse correspondant au user via la clef user_id de Address.
  try {
    const resp2 = await api.get(`/address/p2/${user?.id}`);
    console.log("[lStoreAddressData] resp2 : ", resp2)
    return resp2.data;
  }
  catch (error2) {
    const axiosError = error2 as AxiosError;
    console.log("Erreur inconnue : ", error2);
    console.log("axiosError : ", axiosError.message);
  }
}