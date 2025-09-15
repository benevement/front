import { AddressInterface } from "./IAddress";

export type roleType = "admin" | "volunteer" | "connected_user";
export type RoleType = "admin" | "volunteer" | "connected_user";
export type roleType2 = "admin" | "volunteer" | "connected_user" | "visitor";

export interface UserSignInInterface {
  email: string;
  password?: string;
}
export interface UserSignupInterface extends UserSignInInterface {
  confirmPassword?: string;
  phone_number?: string;
}
export default interface UserInterface extends UserSignInInterface, UserSignupInterface {
  id?: number;
  first_name: string; // prenom
  last_name: string; // nom
  birthdate?: string;
  avatar?: string; // URL de la photo utilisateur
  role: roleType;
  address_id?: number;
}

/*
export interface UserAddressInterface extends UserInterface, AddressInterface {
  // réunion des interfaces AddressInterface et UserInterface (pour utilisation dans écran UserProfile)
  // peut servir pour traiter les données où les paramètres de User et Address ne sont pas "imbriqués" mais "à plat".    
  }

  // version Adresse imbriquée dans User => marche pas : résultat "aplati"
  export interface UserAddressNestedInterface extends UserInterface { 
    address?: AddressInterface;
    }
*/

export interface IUpdateProfile {
  id?: number;
  first_name?: string; 
  last_name?: string; 
  birthdate?: string;
  email?: string; 
  phone_number?: string;
  address_id?: number;
  address?: AddressInterface;
}

export interface UserInterfaceBdd extends UserInterface {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAuthState {
  user: { email: string; role: roleType } | null;
  token: string | null;
  setAuth: (user: IAuthState['user'], token: string) => void;
  logout: () => void;
}


export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: roleType;
<<<<<<< HEAD
  address: AddressInterface;
=======
  address_id?: number;
>>>>>>> BEN-92
  phone_number?: string;
}

export interface IUserStorage extends IUser {
  birthdate?: string;
}
export type UserStorageType = Omit<IUser, "role" | "address_id"> & { birthdate?: string }



/*
`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(90) NOT NULL,
  `last_name` VARCHAR(90) NOT NULL,
  `birthdate` DATE NULL,
  `email` VARCHAR(320) NOT NULL,
  `password` VARCHAR(250) NULL,
  `phone_number` VARCHAR(25) NULL,
  `role` ENUM('admin', 'volunteer', 'connected_user', 'visitor') NOT NULL DEFAULT 'visitor',
  `created_at` DATETIME NULL DEFAULT now(),
  `updated_at` DATETIME NULL DEFAULT now(),
  */
